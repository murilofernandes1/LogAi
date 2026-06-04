import { Injectable } from '@nestjs/common';
import { DeliveryInterface } from './delivery.interface.js';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import {
  AssignDeliveries,
  DeliveryDTO,
  DeliveryResponse,
  DeliveryStatus,
  UpdateDeliveryDTO,
  UpdateDeliveryStatus,
} from '../../common/types/delivery.types.js';
import { Delivery } from './delivery.entity.js';

@Injectable()
export class DeliveryRepository implements DeliveryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createDelivery(data: DeliveryDTO): Promise<Delivery> {
    const raw = await this.prisma.delivery.create({
      data: data,
    });
    return new Delivery(
      raw.id,
      raw.recipientName,
      raw.recipientPhone,
      raw.address,
      raw.city,
      raw.zipCode,
      raw.weight,
      raw.code,
      raw.routeId,
      raw.status as DeliveryStatus,
      raw.createdAt,
      raw.updatedAt,
    );
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
  ): Promise<Delivery> {
    const raw = await this.prisma.delivery.update({
      where: {
        id: id,
      },
      data: {
        ...data,
      },
    });
    return new Delivery(
      raw.id,
      raw.recipientName,
      raw.recipientPhone,
      raw.address,
      raw.city,
      raw.zipCode,
      raw.weight,
      raw.code,
      raw.routeId,
      raw.status as DeliveryStatus,
      raw.createdAt,
      raw.updatedAt,
    );
  }
  async updateDeliveryStatus(data: UpdateDeliveryStatus): Promise<Delivery> {
    const raw = await this.prisma.delivery.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    return new Delivery(
      raw.id,
      raw.recipientName,
      raw.recipientPhone,
      raw.address,
      raw.city,
      raw.zipCode,
      raw.weight,
      raw.code,
      raw.routeId,
      raw.status as DeliveryStatus,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  async seeDeliveries(): Promise<Delivery[]> {
    const raw = await this.prisma.delivery.findMany();
    return raw.map(
      (r) =>
        new Delivery(
          r.id,
          r.recipientName,
          r.recipientPhone,
          r.address,
          r.city,
          r.zipCode,
          r.weight,
          r.code,
          r.routeId,
          r.status as DeliveryStatus,
          r.createdAt,
          r.updatedAt,
        ),
    );
  }

  async seeDelivery(id: string): Promise<Delivery | null> {
    const raw = await this.prisma.delivery.findUnique({
      where: {
        id: id,
      },
    });
    if (!raw) return null;
    return new Delivery(
      raw.id,
      raw.recipientName,
      raw.recipientPhone,
      raw.address,
      raw.city,
      raw.zipCode,
      raw.weight,
      raw.code,
      raw.routeId,
      raw.status as DeliveryStatus,
      raw.createdAt,
      raw.updatedAt,
    );
  }
  async seeDeliveryByCode(code: string): Promise<Delivery | null> {
    const raw = await this.prisma.delivery.findUnique({
      where: {
        code: code,
      },
    });
    if (!raw) return null;

    return new Delivery(
      raw.id,
      raw.recipientName,
      raw.recipientPhone,
      raw.address,
      raw.city,
      raw.zipCode,
      raw.weight,
      raw.code,
      raw.routeId,
      raw.status as DeliveryStatus,
      raw.createdAt,
      raw.updatedAt,
    );
  }
  async assignToRoute(data: AssignDeliveries): Promise<Delivery> {
    const rows = await this.prisma.delivery.update({
      where: { id: data.deliveryId },
      data: { routeId: data.routeId },
    });

    return new Delivery(
      rows.id,
      rows.recipientName,
      rows.recipientPhone,
      rows.address,
      rows.city,
      rows.zipCode,
      rows.weight,
      rows.code,
      rows.routeId,
      rows.status as DeliveryStatus,
      rows.createdAt,
      rows.updatedAt,
    );
  }
}
