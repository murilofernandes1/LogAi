import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/core/prisma/prisma.service.js';
import { UserInterface } from '../domain/user.interface.js';
import { User } from '../domain/user.entity.js';
import {
  SignUpDTO,
  UserWithPassword,
} from '../../../common/types/auth.types.js';
import { Roles } from '../../../common/decorators/role.decorator.js';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: any): User {
    return new User(
      raw.id,
      raw.name,
      raw.email,
      raw.role,
      raw.status,
      raw.phone,
      raw.licensePlate,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  //----------------------------------//
  //    GENERAL & AUTH REPOSITORY     //
  //----------------------------------//
  async getMe(id: string): Promise<User> {
    const raw = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.toDomain(raw);
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!raw) return null;

    return this.toDomain(raw);
  }
  async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPassword | null> {
    const raw = await this.prisma.user.findUnique({ where: { email } });
    if (!raw) return null;

    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      role: raw.role,
      password: raw.password,
    };
  }

  async create(data: SignUpDTO): Promise<User> {
    const raw = await this.prisma.user.create({ data });
    return this.toDomain(raw);
  }

  //----------------------------------//
  //        DRIVER REPOSITORY         //
  //----------------------------------//

  async seeDriver(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: { id: id, role: 'DRIVER' },
    });
    if (!raw) return null;
    return this.toDomain(raw);
  }
}
