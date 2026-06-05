import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthRepository } from './auth.repository.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { jwtConstants } from '../../common/constants/jwt.contants.js';
import { CryptoModule } from '../../common/core/crypto/crypto.module.js';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
  ],
})
export class AuthModule {}
