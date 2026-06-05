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
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { AdminService } from './admin.service.js';
import { CurrentUser } from '../../common/decorators/user.decorator.js';
import type { AdminResponse } from '../../common/types/user.types.js';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@CurrentUser('id') id): Promise<AdminResponse> {
    return this.adminService.getMe(id);
  }
}
