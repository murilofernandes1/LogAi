import { Controller, Body, Get, Patch, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard.js';
import { UserService } from './user.service.js';
import type { Role, UserResponse } from './user.types.js';
import { CurrentUser } from './user.decorator.js';
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@CurrentUser('user') user): Promise<UserResponse> {
    return user;
  }

  @Patch(':id/role')
  async updateUserRole(@Param('id') id: string, @Body() body: Role) {
    return this.userService.updateUserRole(id, body);
  }
}
