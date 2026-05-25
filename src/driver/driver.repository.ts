import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service.js';
import type { DriverDTO } from '../types/driver.types.js';
import { DriverInterface } from './driver.interface.js';

@Injectable()
export class DriverRepository implements DriverInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: DriverDTO) {
    return this.prisma.driver.create({ data });
  }

  async findDriverByEmail(email: string) {
    return this.prisma.driver.findUnique({
      where: {
        email: email,
      },
    });
  }
}
