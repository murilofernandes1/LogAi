import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty({ example: 'Nome do Usuario' })
  name: string;
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
}

export class SignInDTO {
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
}

export class AdminResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
