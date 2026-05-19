import { Injectable } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(data: SignUpDTO) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      return;
    }
    console.log({ data });
    return;
  }

  async signin(data: SignInDTO) {
    console.log({ data });
  }
}
