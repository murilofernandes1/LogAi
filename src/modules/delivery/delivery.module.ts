import { Module } from '@nestjs/common';
import { DeliveryDriverController } from './presentation/delivery-driver.controller.js';
import { DeliveryAdminController } from './presentation/delivery-admin.controller.js';
import { DeliveryService } from './application/delivery.service.js';
import { DeliveryRepository } from './infrastructure/delivery.repository.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard.js';

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

    DeliveryRepository,
  ],
  controllers: [DeliveryAdminController, DeliveryDriverController],
  exports: [DeliveryService, 'IDeliveryRepository'],
})
export class DeliveryModule {}
