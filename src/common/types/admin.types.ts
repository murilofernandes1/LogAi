import { ApiProperty } from '@nestjs/swagger';
export class Admin {
  id: string;
  @ApiProperty({ example: 'Nome do Admin' })
  name: string;
  @ApiProperty({ example: 'admin@email.com' })
  email: string;
  role: AdminRoles;
  type: AdminTypes;
}

export class AdminResponse {
  id: string;
  name: string;
  email: string;
  role: AdminRoles;
}

export class UpdateRole {
  id: string;
  role: 'ADMIN' | 'USER';
}

export enum AdminTypes {
  USER = 'USER',
  DRIVER = 'DRIVER',
}

export type AdminRoles = 'ADMIN' | 'USER';
