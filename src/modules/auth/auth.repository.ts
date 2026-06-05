import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import { SignUpDTO } from '../../common/types/auth.types.js';
import { AuthInterface } from './auth.interface.js';
import { Auth } from './auth.entity.js';
import { Driver } from '../driver/driver.entity.js';

@Injectable()
export class AuthRepository extends AuthInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: SignUpDTO): Promise<Auth> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<Auth> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findDriverByEmail(email: string): Promise<Auth | null> {
    const raw = await this.prisma.driver.findUnique({
      where: {
        email: email,
      },
    });
    if (!raw) {
      return null;
    }
    return new Driver(
      raw.id,
      raw.name,
      raw.status,
      raw.email,
      raw.password,
      raw.phone,
      raw.updatedAt,
      raw.createdAt,
    );
  }
}
