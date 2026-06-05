import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  SignInDTO,
  SignUpDTO,
  UserWithPassword,
} from '../../../common/types/auth.types.js';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from '../../user/domain/user.interface.js';
import { CryptoInterface } from '../../../common/core/crypto/crypto.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject('IUserRepository')
    private readonly userInterface: UserInterface,

    private readonly cryptoInterface: CryptoInterface,
  ) {}

  async signup(signUp: SignUpDTO) {
    if (!signUp) {
      throw new BadRequestException();
    }
    const adminAlreadyExists = await this.userInterface.findByEmail(
      signUp.email,
    );

    if (adminAlreadyExists) {
      throw new UnauthorizedException('Admin already exists.');
    }

    const hashPassword = await this.cryptoInterface.hash(signUp.password);

    const user = await this.userInterface.create({
      name: signUp.name,
      email: signUp.email,
      password: hashPassword,
      role: signUp.role,
    });
    return user;
  }

  async signin(signIn: SignInDTO): Promise<{ acessToken: string }> {
    if (!signIn) {
      throw new BadRequestException();
    }
    const user = await this.userInterface.findByEmailWithPassword(signIn.email);

    if (!user) {
      throw new NotFoundException('Invalid credentials.');
    }

    const isPasswordMatch = await this.cryptoInterface.compare(
      signIn.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const acessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { acessToken };
  }
}
