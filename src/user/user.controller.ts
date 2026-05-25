import {
  Controller,
  Body,
  Get,
  Patch,
  UseGuards,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard.js';
import { UserService } from './user.service.js';
import type { UserResponse } from '../types/user.types.js';
import { CurrentUser } from '../decorators/user.decorator.js';
import { Roles } from '../decorators/role.decorator.js';
import { RolesGuard } from '../guards/role.guard.js';
import type { UserRoles } from '../types/user.types.js';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@CurrentUser('id') id): Promise<UserResponse> {
    return this.userService.getMe(id);
  }

  @Roles('ADMIN')
  @Patch(':id/role')
  @HttpCode(HttpStatus.OK)
  async updateUserRole(@Param('id') id: string, @Body() body: UserRoles) {
    return this.userService.updateUserRole(id, body);
  }
}
