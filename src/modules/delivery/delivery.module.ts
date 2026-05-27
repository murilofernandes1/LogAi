import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller.js';
import { DeliveryService } from './delivery.service.js';
import { DeliveryRepository } from './delivery.repository.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/role.guard.js';

@Module({
  imports: [],
  providers: [
    DeliveryService,
    {
      provide: 'IDeliveryRepository',
      useClass: DeliveryRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    DeliveryRepository,
  ],
  controllers: [DeliveryController],
  exports: [DeliveryService, 'IDeliveryRepository'],
})
export class DeliveryModule {}
