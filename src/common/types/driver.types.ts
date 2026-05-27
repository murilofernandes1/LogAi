import { ApiProperty } from '@nestjs/swagger';

export class DriverDTO {
  @ApiProperty({ example: 'Nome do motorista' })
  name: string;
  @ApiProperty({ example: 'usuario@email.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
  @ApiProperty({ example: 'ABC123' })
  licensePlate: string;
  @ApiProperty({ example: '1193847838' })
  phone: number;
}

export class DriverResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  licensePlate: string;
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Status = {
  status: 'ACTIVE' | 'INACTIVE';
};
