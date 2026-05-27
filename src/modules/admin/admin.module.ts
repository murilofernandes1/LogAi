import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller.js';
import { AdminRepository } from './admin.repository.js';
import { AdminService } from './admin.service.js';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../common/guards/role.guard.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';

@Module({
  providers: [
    AdminService,
    {
      provide: 'IAdminRepository',
      useClass: AdminRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AdminRepository,
  ],
  controllers: [AdminController],
})
export class AdminModule {}
