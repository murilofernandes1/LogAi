import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeliveryInterface } from './delivery.interface.js';
import {
  CreateDelivery,
  DeliveryDTO,
  UpdateDeliveryStatus,
  DeliveryStatus,
  UpdateDeliveryDTO,
} from '../types/delivery.types.js';
import codeGen from '../utils/codeGen.js';

@Injectable()
export class DeliveryService {
  constructor(
    @Inject('IDeliveryRepository')
    private readonly deliveryInterface: DeliveryInterface,
  ) {}

  async createDelivery(data: CreateDelivery) {
    const code = codeGen(6);

    const delivery = await this.deliveryInterface.createDelivery({
      ...data,
      code: code,
    });

    return delivery;
  }

  async seeDelivery(id: string) {
    const delivery = await this.deliveryInterface.seeDelivery(id);

    if (!delivery) {
      throw new NotFoundException('Delivery not found.');
    }

    return delivery;
  }

  async seeDeliveries() {
    const deliveries = await this.deliveryInterface.seeDeliveries();

    if (!deliveries) {
      return {};
    }

    return deliveries;
  }

  async seeDeliveryByCode(code: string) {
    const delivery = await this.deliveryInterface.seeDeliveryByCode(code);

    if (!delivery) {
      throw new NotFoundException('Delivery not found.');
    }
    return delivery;
  }

  async updateDeliveryStatus(data: UpdateDeliveryStatus) {
    const status = ['PENDING', 'IN_ROUTE', 'DELIVERED'];

    if (!status.includes(data.status)) {
      throw new BadRequestException('Invalid status.');
    }

    const delivery = await this.deliveryInterface.seeDelivery(data.id);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    if (delivery.status === data.status) {
      throw new BadRequestException(
        'It is not possible to repeat the same status.',
      );
    }
    return await this.deliveryInterface.updateDeliveryStatus(data);
  }

  async updateDeliveryFields(id: string, data: UpdateDeliveryDTO) {
    const delivery = await this.deliveryInterface.seeDelivery(id);

    if (!delivery) {
      throw new NotFoundException('Delivery not found.');
    }

    const updatedDelivery = await this.deliveryInterface.updateDeliveryFields(
      id,
      data,
    );
    if (!updatedDelivery) {
      throw new BadRequestException('Invalid data.');
    }
    return updatedDelivery;
  }

  async cancelDelivery(id: string) {
    const delivery = await this.deliveryInterface.seeDelivery(id);

    if (!delivery) {
      throw new NotFoundException('Delivery not found.');
    }

    await this.deliveryInterface.cancelDelivery(id);

    return {};
  }
}
