import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

@Module({
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
