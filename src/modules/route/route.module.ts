import { Module, forwardRef } from '@nestjs/common';
import { RouteController } from './route.controller.js';
import { RouteService } from './route.service.js';
import { RouteRepository } from './route.repository.js';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/role.guard.js';
import { DriverModule } from '../driver/driver.module.js';
@Module({
  imports: [forwardRef(() => DriverModule)], // for circular dependy error
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    RouteRepository,
  ],
  controllers: [RouteController],
  exports: [RouteService, 'IRouteRepository'],
})
export class RouteModule {}
