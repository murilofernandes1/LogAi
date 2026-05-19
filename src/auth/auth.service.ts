import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup(data: SignUpDTO) {
    if (!data) {
      throw new Error('Fields cannot be empty.');
    }
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists.');
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });
    return (user.id, user.email, user.name);
  }

  async signin(data: SignInDTO) {
    if (!data) {
      throw new Error('Fields cannot be empty.');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User already exists.');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    const acessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return acessToken;
  }
}
