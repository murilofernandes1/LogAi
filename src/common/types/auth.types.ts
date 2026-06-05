import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './user.types.js';
import { Auth } from '../../modules/auth/auth.entity.js';

export class SignUpDTO {
  @ApiProperty({ example: 'Nome do Usuario' })
  name: string;
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
  @ApiProperty({ example: 'ADMIN' })
  role: Roles;
}

export class SignInDTO {
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
}

export class AuthResult {
  user: Auth;
  passwordHash: string;
}
