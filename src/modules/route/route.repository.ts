import { Injectable } from '@nestjs/common';
import { RouteInterface } from './route.interface.js';
import { PrismaService } from '../../common/core/prisma/prisma.service.js';
import {
  AssignRoute,
  RouteDTO,
  RouteStatus,
  UpdateStatus,
} from '../../common/types/route.types.js';
import { Route } from './route.entity.js';

@Injectable()
export class RouteRepository implements RouteInterface {
  constructor(private readonly prisma: PrismaService) {}
  private toDomain(raw: any): Route {
    return new Route(
      raw.id,
      raw.status as RouteStatus,
      raw.driverId,
      raw.createdAt,
    );
  }
  async create(data: RouteDTO): Promise<Route> {
    const raw = await this.prisma.route.create({
      data: {
        driverId: data.driverId ?? null,
      },
    });

    return this.toDomain(raw);
  }

  async seeRoute(id: string): Promise<Route | null> {
    const raw = await this.prisma.route.findUnique({ where: { id } });
    if (!raw) return null;

    return this.toDomain(raw);
  }

  async allRoutes(): Promise<Route[] | null> {
    const raws = await this.prisma.route.findMany();
    return raws.map(
      (r) => new Route(r.id, r.status as RouteStatus, r.driverId, r.createdAt),
    );
  }

  async assignRoute(data: AssignRoute): Promise<Route> {
    const raw = await this.prisma.route.update({
      where: { id: data.id },
      data: { driverId: data.driverId },
    });

    return this.toDomain(raw);
  }

  async updateStatus(data: UpdateStatus): Promise<Route> {
    const raw = await this.prisma.route.update({
      where: { id: data.routeId },
      data: { status: data.status },
    });

    return this.toDomain(raw);
  }

  async deleteRoute(id: string) {
    const raw = await this.prisma.route.delete({
      where: {
        id: id,
      },
    });

    return this.toDomain(raw);
  }

  async myRoutes(id: string): Promise<Route[] | null> {
    const raws = await this.prisma.route.findMany({
      where: {
        driverId: id,
      },
    });

    return raws.map((r) => this.toDomain(r));
  }
}
