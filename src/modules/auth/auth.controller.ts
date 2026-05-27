import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO, SignInDTO } from '../../common/types/auth.types.js';
import { AuthService } from './auth.service.js';
import { Public } from '../../common/decorators/public.decorator.js';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Public()
  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    return this.authService.signin(body);
  }

  @Public()
  @Post('driver/signin')
  async driverSignIn(@Body() body: SignInDTO) {
    return this.authService.driverSignIn(body);
  }
}
