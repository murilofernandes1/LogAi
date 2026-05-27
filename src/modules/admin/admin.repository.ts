import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import type {
  AdminResponse,
  AdminRoles,
} from '../../common/types/admin.types.js';
import { AdminInterface } from './admin.interface.js';

@Injectable()
export class AdminRepository implements AdminInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(id: string): Promise<AdminResponse> {
    const admin = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return admin as unknown as AdminResponse;
  }

  async updateAdminRole(id: string, role: AdminRoles): Promise<AdminResponse> {
    const updatedAdmin = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    return {
      id: updatedAdmin.id,
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      role: updatedAdmin.role as AdminRoles,
    };
  }
}
