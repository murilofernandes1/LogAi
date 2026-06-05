import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller.js';
import { UserService } from './application/user.service.js';
import { UserRepository } from './infrastructure/user.repository.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard.js';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserRepository,
  ],
  exports: ['IUserRepository', UserService],
})
export class UserModule {}
