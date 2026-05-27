import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module.js';
import { PrismaService } from './common/core/prisma/prisma.service.js';
import { PrismaModule } from './common/core/prisma/prisma.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { DriverModule } from './modules/driver/driver.module.js';
import { RouteModule } from './modules/route/route.module.js';
import { DeliveryModule } from './modules/delivery/delivery.module.js';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    AdminModule,
    DriverModule,
    RouteModule,
    DeliveryModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
