import { Injectable } from '@nestjs/common';
import { DeliveryInterface } from './delivery.interface.js';
import { PrismaService } from '../core/prisma/prisma.service.js';
import {
  DeliveryDTO,
  DeliveryResponse,
  UpdateDeliveryDTO,
  UpdateDeliveryStatus,
} from '../types/delivery.types.js';

@Injectable()
export class DeliveryRepository implements DeliveryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createDelivery(data: DeliveryDTO): Promise<DeliveryResponse> {
    return this.prisma.delivery.create({
      data: data,
    });
  }

  async cancelDelivery(id: string): Promise<{}> {
    return this.prisma.delivery.delete({
      where: {
        id: id,
      },
    });
  }

  async updateDeliveryFields(
    id: string,
    data: UpdateDeliveryDTO,
  ): Promise<DeliveryResponse> {
    return this.prisma.delivery.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
  }
  async updateDeliveryStatus(
    data: UpdateDeliveryStatus,
  ): Promise<DeliveryResponse> {
    return this.prisma.delivery.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
  }

  async seeDeliveries(): Promise<DeliveryResponse[]> {
    return this.prisma.delivery.findMany();
  }

  async seeDelivery(id: string): Promise<DeliveryResponse | null> {
    return this.prisma.delivery.findUnique({
      where: {
        id: id,
      },
    });
  }
  async seeDeliveryByCode(code: string): Promise<DeliveryResponse | null> {
    return this.prisma.delivery.findUnique({
      where: {
        code: code,
      },
    });
  }
}
