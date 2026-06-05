import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO, SignInDTO } from '../../../common/types/auth.types.js';
import { AuthService } from '../application/auth.service.js';
import { Public } from '../../../common/decorators/public.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Public()
  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    return this.authService.signin(body);
  }
}
