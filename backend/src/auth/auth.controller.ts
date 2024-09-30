import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // Groups all auth-related endpoints under 'Authentication'
@ApiBearerAuth() // Specifies that the endpoints use Bearer Authentication
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: CreateAuthDto })
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto.email, createAuthDto.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully', schema: { example: { accessToken: 'jwt_token' } } })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiBody({ type: CreateAuthDto })
  async login(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.validateUser(createAuthDto.email, createAuthDto.password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  @ApiOperation({ summary: 'Update user details' })
  @ApiBearerAuth() // Indicates that this endpoint requires Bearer token authentication
  @ApiResponse({ status: 200, description: 'User updated successfully', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email is already in use' })
  @ApiBody({ type: UpdateAuthDto })
  async updateProfile(@Body() updateAuthDto: UpdateAuthDto) {
    const user = await this.authService.validateUser(updateAuthDto.email, updateAuthDto.password);
    return await this.authService.update(user.id, updateAuthDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Get the user profile' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user', type: User })
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
