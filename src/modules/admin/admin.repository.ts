import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import type { AdminResponse } from '../../common/types/admin.types.js';
import { AdminInterface } from './admin.interface.js';
import { Admin } from './admin.entity.js';

@Injectable()
export class AdminRepository implements AdminInterface {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: any) {
    return new Admin(raw.id, raw.name, raw.email);
  }

  async getMe(id: string): Promise<Admin> {
    const raw = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return this.toDomain(raw);
  }
}
