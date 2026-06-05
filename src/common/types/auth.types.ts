import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './user.types.js';

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

export type UserWithPassword = {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
};
