import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO, SignUpDTO } from '../../common/types/auth.types.js';
import { JwtService } from '@nestjs/jwt';
import { AuthInterface } from './auth.interface.js';
import { CryptoInterface } from '../../common/core/crypto/crypto.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject('IAuthRepository')
    private readonly authInterface: AuthInterface,

    private readonly cryptoInterface: CryptoInterface,
  ) {}

  async signup(signUp: SignUpDTO) {
    if (!signUp) {
      throw new BadRequestException();
    }
    const adminAlreadyExists = await this.authInterface.findByEmail(
      signUp.email,
    );

    if (adminAlreadyExists) {
      throw new UnauthorizedException('Admin already exists.');
    }

    const hashPassword = await this.cryptoInterface.hash(signUp.password);

    const user = await this.authInterface.create({
      name: signUp.name,
      email: signUp.email,
      password: hashPassword,
      role: signUp.role,
    });
    return user;
  }

  async signin(signIn: SignInDTO) {
    if (!signIn) {
      throw new BadRequestException();
    }
    const user = await this.authInterface.findByEmail(signIn.email);

    if (!user) {
      throw new NotFoundException('Admin not found.');
    }

    const isPasswordMatch = await this.cryptoInterface.compare(
      signIn.password,
      user.passwordHash,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    const acessToken = await this.jwtService.signAsync({
      id: user.user.id,
      email: user.user.email,
      name: user.user.name,
      role: user.user.role,
    });

    return acessToken;
  }
}
