import {
  CreateDelivery,
  DeliveryDTO,
  DeliveryResponse,
  UpdateDeliveryDTO,
  UpdateDeliveryStatus,
} from '../types/delivery.types.js';

export abstract class DeliveryInterface {
  abstract createDelivery(data: DeliveryDTO): Promise<DeliveryResponse>;
  abstract seeDelivery(id: string): Promise<DeliveryResponse | null>;
  abstract seeDeliveries(): Promise<DeliveryResponse[]>;
  abstract seeDeliveryByCode(code: string): Promise<DeliveryResponse | null>;
  abstract cancelDelivery(id: string): Promise<{}>;
  abstract updateDeliveryStatus(
    data: UpdateDeliveryStatus,
  ): Promise<DeliveryResponse>;
  abstract updateDeliveryFields(
    id: string,
    data: UpdateDeliveryDTO,
  ): Promise<DeliveryResponse>;
}
