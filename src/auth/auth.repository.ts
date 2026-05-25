import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service.js';
import { SignUpDTO } from '../types/auth.types.js';
import { AuthInterface } from './auth.interface.js';

@Injectable()
export class AuthRepository extends AuthInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: SignUpDTO): Promise<SignUpDTO> {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findDriverByEmail(email: string) {
    return this.prisma.driver.findUnique({
      where: {
        email: email,
      },
    });
  }
}
