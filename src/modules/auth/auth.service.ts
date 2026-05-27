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
import { DriverInterface } from '../driver/driver.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject('IAuthRepository')
    private readonly authInterface: AuthInterface,

    @Inject('IDriverRepository')
    private readonly driverInterface: DriverInterface,

    private readonly cryptoInterface: CryptoInterface,
  ) {}

  //SIGN-UP SERVICE
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

    const admin = await this.authInterface.create({
      name: signUp.name,
      email: signUp.email,
      password: hashPassword,
    });
    return admin;
  }

  //SIGN-IN SERVICE
  async signin(signIn: SignInDTO) {
    if (!signIn) {
      throw new BadRequestException();
    }
    const admin = await this.authInterface.findByEmail(signIn.email);

    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }

    const isPasswordMatch = await this.cryptoInterface.compare(
      signIn.password,
      admin.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password.');
    }

    const acessToken = await this.jwtService.signAsync({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      type: 'USER',
    });

    return acessToken;
  }

  //DRIVER SIGN-IN
  async driverSignIn(driverSignIn: SignInDTO) {
    if (!driverSignIn) {
      throw new BadRequestException();
    }
    const driver = await this.driverInterface.findDriverByEmail(
      driverSignIn.email,
    );

    if (!driver) {
      throw new NotFoundException('Admin not found.');
    }

    const isPasswordMatch = await this.cryptoInterface.compare(
      driverSignIn.password,
      driver.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const acessToken = await this.jwtService.signAsync({
      id: driver.id,
      email: driver.email,
      name: driver.name,
      type: 'DRIVER',
    });

    return acessToken;
  }
}
