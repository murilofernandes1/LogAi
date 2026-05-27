import { ApiProperty } from '@nestjs/swagger';
export class DeliveryDTO {
  @ApiProperty({ example: 'Nome do destinatário' })
  recipientName: string;
  @ApiProperty({ example: '11 123456789' })
  recipientPhone: number;
  @ApiProperty({ example: 'Rua de exemplo, 00' })
  address: string;
  @ApiProperty({ example: 'Cidade de exemplo' })
  city: string;
  @ApiProperty({ example: '12345' })
  zipCode: number;
  @ApiProperty({ example: '1.5' })
  weight: number;
  code: string;
  status: string;
  routeId: string | null;
}

export class DeliveryResponse {
  id: string;
  recipientName: string;
  recipientPhone: number;
  address: string;
  city: string;
  zipCode: number;
  weight: number;
  code: string;
  routeId: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  deliveryHistory?: [];
}

export class UpdateDeliveryStatus {
  id: string;
  status: DeliveryStatus;
}
export type UpdateDeliveryDTO = Partial<DeliveryDTO>;

export type DeliveryStatus = 'PENDING' | 'IN_ROUTE' | 'DELIVERED' | 'REFUSED';

export type CreateDelivery = Omit<DeliveryDTO, 'id' | 'code'>;
