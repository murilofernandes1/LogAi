import { PrismaService } from './prisma.service.js';
import { Global, Module } from '@nestjs/common';
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
@Global()
export class PrismaModule {}
