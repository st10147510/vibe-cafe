import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto.email, createAuthDto.password);
  }

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.validateUser(createAuthDto.email, createAuthDto.password);
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateProfile(@Body() updateAuthDto: UpdateAuthDto) {
    const user = await this.authService.validateUser(updateAuthDto.email, updateAuthDto.password);
    return await this.authService.update(user.id, updateAuthDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
