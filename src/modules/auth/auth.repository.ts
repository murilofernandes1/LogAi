import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import { AuthResult, SignUpDTO } from '../../common/types/auth.types.js';
import { AuthInterface } from './auth.interface.js';
import { Auth } from './auth.entity.js';

@Injectable()
export class AuthRepository extends AuthInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  private toDomain(raw: any): Auth {
    return new Auth(
      raw.id,
      raw.name,
      raw.status,
      raw.email,
      raw.phone,
      raw.licensePlate,
      raw.role,
      raw.updatedAt,
      raw.createdAt,
    );
  }
  async create(data: SignUpDTO): Promise<Auth> {
    const raw = this.prisma.user.create({ data });

    return this.toDomain(raw);
  }

  async findByEmail(email: string): Promise<AuthResult | null> {
    const raw = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!raw) return null;

    return { user: this.toDomain(raw), passwordHash: raw.password };
  }
}
