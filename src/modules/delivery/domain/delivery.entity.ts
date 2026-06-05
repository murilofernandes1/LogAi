import {
  AssignDeliveries,
  DeliveryStatus,
} from '../../../common/types/delivery.types.js';

export class Delivery {
  constructor(
    public readonly id: string,
    public readonly recipientName: string,
    public readonly recipientPhone: number,
    public readonly address: string,
    public readonly city: string,
    public readonly zipCode: number,
    public readonly weight: number,
    public readonly code: string,
    public readonly routeId: string | null,
    public readonly status: DeliveryStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
  canUpdateDeliveryStatus(newStatus: DeliveryStatus): boolean {
    return this.status !== newStatus;
  }
}
