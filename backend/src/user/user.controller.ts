import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users') // Groups all user-related endpoints under 'Users'
@ApiBearerAuth() // Specifies that the endpoints use Bearer Authentication
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to fetch user details by ID
  @ApiOperation({ summary: 'Get the user' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user', type: User })
  // Ensure that only authenticated users can access this endpoint
  @UseGuards(AuthGuard('jwt')) 
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Get the profile of the authenticated user' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved user profile', type: User })
  // Endpoint to fetch the profile of the authenticated user
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return await this.userService.findById(user.id);
  }
}
