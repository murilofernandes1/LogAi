import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service.js';
import type { DriverDTO, DriverResponse } from '../types/driver.types.js';
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

  async seeDriver(id: string) {
    return this.prisma.driver.findUnique({
      where: {
        id: id,
      },
    });
  }

  async allDrivers(): Promise<DriverResponse[] | null> {
    return this.prisma.driver.findMany();
  }
}
