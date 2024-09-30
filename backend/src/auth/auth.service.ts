import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  
  /**
   * Validate user credentials
   * @param email 
   * @param password 
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.validateUser(email, password);
    if (user) {
      return user;
    }
    return null;
  }

  /**
   * Update an existing user's details
   * @param userId - ID of the user to be updated
   * @param updateAuthDto - The update DTO containing the new data
   */
  async update(userId: number, updateAuthDto: UpdateAuthDto): Promise<User> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateAuthDto.email) {
      const existingUser = await this.userService.findByEmail(updateAuthDto.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Email is already in use');
      }
    }

    return this.userService.updateUser(userId, updateAuthDto);
  }


  /**
   * Generate a JWT token for authenticated users
   * @param User - the user to log in
   */
  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Register a new user
   * @param email 
   * @param password 
   */
  async register(email: string, password: string): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register the user using UserService
    const newUser = await this.userService.register(email, hashedPassword);

    return newUser;
  }
}
