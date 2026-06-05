import { Injectable } from '@nestjs/common';
import { DeliveryInterface } from '../domain/delivery.interface.js';
import { PrismaService } from '../../../common/core/prisma/prisma.service.js';
import {
  AssignDeliveries,
  DeliveryDTO,
  DeliveryResponse,
  DeliveryStatus,
  UpdateDeliveryDTO,
  UpdateDeliveryStatus,
} from '../../../common/types/delivery.types.js';
import { Delivery } from '../domain/delivery.entity.js';

@Injectable()
export class DeliveryRepository implements DeliveryInterface {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: any): Delivery {
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

  async createDelivery(data: DeliveryDTO): Promise<Delivery> {
    const raw = await this.prisma.delivery.create({
      data: data,
    });
    return this.toDomain(raw);
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
    return this.toDomain(raw);
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
    return this.toDomain(raw);
  }

  async seeDeliveries(): Promise<Delivery[]> {
    const raw = await this.prisma.delivery.findMany();
    return raw.map((r) => this.toDomain(r));
  }

  async seeDelivery(id: string): Promise<Delivery | null> {
    const raw = await this.prisma.delivery.findUnique({
      where: {
        id: id,
      },
    });
    if (!raw) return null;
    return this.toDomain(raw);
  }
  async seeDeliveryByCode(code: string): Promise<Delivery | null> {
    const raw = await this.prisma.delivery.findUnique({
      where: {
        code: code,
      },
    });
    if (!raw) return null;

    return this.toDomain(raw);
  }
  async assignToRoute(data: AssignDeliveries): Promise<Delivery[]> {
    await this.prisma.delivery.updateMany({
      where: {
        id: { in: data.deliveriesId },
      },
      data: {
        routeId: data.routeId,
      },
    });

    const rows = await this.prisma.delivery.findMany({
      where: {
        id: { in: data.deliveriesId },
      },
    });

    return rows.map((r) => this.toDomain(r));
  }
}
