import { Module } from '@nestjs/common';
import { DriverService } from './driver.service.js';
import { DriverRepository } from './driver.repository.js';
import { DriverController } from './driver.controller.js';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/role.guard.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { CryptoModule } from '../core/crypto/crypto.module.js';

@Module({
  imports: [CryptoModule],
  providers: [
    DriverService,
    {
      provide: 'IDriverRepository',
      useClass: DriverRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    DriverRepository,
  ],
  controllers: [DriverController],
  exports: [DriverService, 'IDriverRepository'],
})
export class DriverModule {}
