import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service.js';
import { Role } from './user.types.js';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserRole(id: string, role: Role) {
    return this.prisma.user.update({
      where: { id },
      data: {
        role: role.role,
      },
    });
  }
}
