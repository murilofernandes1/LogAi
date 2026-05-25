import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service.js';
import { UserResponse, UserRoles } from '../types/user.types.js';
import { UserInterface } from './user.interface.js';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user as unknown as UserResponse;
  }

  async updateUserRole(id: string, role: UserRoles): Promise<UserResponse> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role as UserRoles,
    };
  }
}
