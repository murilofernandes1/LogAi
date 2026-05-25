import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { UpdateRole } from '../../types/user.types.js';
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserRole({ id, role }: UpdateRole) {
    return this.prisma.user.update({
      where: { id },
      data: {
        role: role,
      },
    });
  }
}
