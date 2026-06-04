import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import type {
  DriverDTO,
  DriverResponse,
} from '../../common/types/driver.types.js';
import { DriverInterface } from './driver.interface.js';
import { Driver } from './driver.entity.js';

@Injectable()
export class DriverRepository implements DriverInterface {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: any): Driver {
    return new Driver(
      raw.id,
      raw.name,
      raw.email,
      raw.password,
      raw.licensePlate,
      raw.phone,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async create(data: DriverDTO): Promise<Driver> {
    const raw = await this.prisma.driver.create({ data });
    return this.toDomain(raw);
  }

  async findDriverByEmail(email: string): Promise<Driver | null> {
    const raw = await this.prisma.driver.findUnique({
      where: {
        email: email,
      },
    });
    if (!raw) {
      return null;
    }
    return this.toDomain(raw);
  }

  async seeDriver(id: string): Promise<Driver | null> {
    const raw = await this.prisma.driver.findUnique({
      where: {
        id: id,
      },
    });
    if (!raw) {
      return null;
    }
    return this.toDomain(raw);
  }

  async allDrivers(): Promise<Driver[] | null> {
    const raws = await this.prisma.driver.findMany();
    if (!raws) {
      return null;
    }
    return raws.map((r) => this.toDomain(r));
  }
}
