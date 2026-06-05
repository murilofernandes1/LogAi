import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeliveryInterface } from '../domain/delivery.interface.js';
import {
  CreateDelivery,
  DeliveryDTO,
  UpdateDeliveryStatus,
  DeliveryStatus,
  UpdateDeliveryDTO,
} from '../../../common/types/delivery.types.js';
import codeGen from '../../../common/utils/codeGen.js';

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
    const delivery = await this.deliveryInterface.seeDelivery(data.id);

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    if (!delivery.canUpdateDeliveryStatus(data.status)) {
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

    return updatedDelivery;
  }

  async cancelDelivery(id: string) {
    const delivery = await this.deliveryInterface.seeDelivery(id);

    if (!delivery) {
      throw new NotFoundException('Delivery not found.');
    }

    const deleted = await this.deliveryInterface.cancelDelivery(id);

    return deleted;
  }
}
