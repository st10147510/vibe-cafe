import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Find user by email
   * @param email - User's email address
   * @returns User entity or null
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * Find user by ID
   * @param id - User's ID
   * @returns User entity
   */
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Register a new user
   * @param email - User's email
   * @param password - User's plain password
   * @returns The registered User entity
   */
  async register(email: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user entity
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    return this.userRepository.save(newUser);
  }

  /**
   * Update an existing user's details
   * @param userId - The ID of the user to update
   * @param updateAuthDto - Data Transfer Object containing update data
   * @returns The updated user
   */
  async updateUser(userId: number, updateAuthDto: UpdateAuthDto): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (updateAuthDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateAuthDto.password = await bcrypt.hash(updateAuthDto.password, salt);
    }

    await this.userRepository.update(userId, updateAuthDto);
    return this.findById(userId); // Return the updated user entity
  }

  /**
   * Validate user credentials for login
   * @param email - User's email
   * @param password - User's plain password
   * @returns The validated User entity
   */
  async validateUser(email: string, password: string): Promise<User> {
    // Retrieve the user by email
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the plain password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  /**
   * Update user's password
   * @param userId - The ID of the user
   * @param newPassword - The new password
   * @returns Updated User entity
   */
  async updatePassword(userId: number, newPassword: string): Promise<User> {
    const user = await this.findById(userId);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user in the database
    return await this.userRepository.save(user);
  }

  /**
   * Delete a user by ID
   * @param id - The ID of the user
   * @returns A confirmation message
   */
  async deleteUser(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} successfully deleted.`;
  }

  /**
   * Retrieve all users (Admin Use Case)
   * @returns List of all users
   */
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
