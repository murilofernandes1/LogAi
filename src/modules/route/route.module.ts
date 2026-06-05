import { Module, forwardRef } from '@nestjs/common';
import { RouteAdminController } from './route-admin.controller.js';
import { RouteDriverController } from './route-driver.controller.js';
import { RouteService } from './route.service.js';
import { RouteRepository } from './route.repository.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { UserModule } from '../user/user.module.js';
import { DeliveryModule } from '../delivery/delivery.module.js';
@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => DeliveryModule)], // for circular dependy error
  providers: [
    RouteService,
    {
      provide: 'IRouteRepository',
      useClass: RouteRepository,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [RouteDriverController, RouteAdminController],
  exports: [RouteService, 'IRouteRepository'],
})
export class RouteModule {}
