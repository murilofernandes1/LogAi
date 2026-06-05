import {
  AssignDeliveries,
  DeliveryDTO,
  UpdateDeliveryDTO,
  UpdateDeliveryStatus,
} from '../../../common/types/delivery.types.js';
import { Delivery } from './delivery.entity.js';

export abstract class DeliveryInterface {
  abstract createDelivery(data: DeliveryDTO): Promise<Delivery>;
  abstract seeDelivery(id: string): Promise<Delivery | null>;
  abstract seeDeliveries(): Promise<Delivery[]>;
  abstract seeDeliveryByCode(code: string): Promise<Delivery | null>;
  abstract cancelDelivery(id: string): Promise<{}>;
  abstract updateDeliveryStatus(data: UpdateDeliveryStatus): Promise<Delivery>;
  abstract assignToRoute(data: AssignDeliveries): Promise<Delivery[]>;
  abstract updateDeliveryFields(
    id: string,
    data: UpdateDeliveryDTO,
  ): Promise<Delivery>;
}
