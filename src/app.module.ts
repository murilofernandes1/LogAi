import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module.js';
import { PrismaService } from './common/core/prisma/prisma.service.js';
import { PrismaModule } from './common/core/prisma/prisma.module.js';
import { RouteModule } from './modules/route/route.module.js';
import { DeliveryModule } from './modules/delivery/delivery.module.js';
import { UserModule } from './modules/user/user.module.js';

@Module({
  imports: [AuthModule, PrismaModule, RouteModule, DeliveryModule, UserModule],
  providers: [PrismaService],
})
export class AppModule {}
