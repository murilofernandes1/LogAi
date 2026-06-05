import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './presentation/auth.controller.js';
import { AuthService } from './application/auth.service.js';
import { jwtConstants } from '../../common/constants/jwt.contants.js';
import { CryptoModule } from '../../common/core/crypto/crypto.module.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
