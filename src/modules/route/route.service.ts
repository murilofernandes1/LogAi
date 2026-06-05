import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RouteInterface } from './route.interface.js';
import {
  AssignRoute,
  RouteDTO,
  UpdateStatus,
} from '../../common/types/route.types.js';
import { DriverInterface } from '../driver/driver.interface.js';
import { AssignDeliveries } from '../../common/types/delivery.types.js';
import { DeliveryInterface } from '../delivery/domain/delivery.interface.js';
@Injectable()
export class RouteService {
  constructor(
    @Inject('IRouteRepository')
    private readonly routeInterface: RouteInterface,
    @Inject('IDriverRepository')
    private readonly driverInterface: DriverInterface,
    @Inject('DeliveryRepository')
    private readonly deliveryInterface: DeliveryInterface,
  ) {}

  async create(data: RouteDTO) {
    if (!data) {
      throw new Error('Invalid data.');
    }
    const route = await this.routeInterface.create(data);
    return route;
  }

  async seeRoute(id: string) {
    if (!id) {
      throw new BadRequestException();
    }
    const route = await this.routeInterface.seeRoute(id);
    if (!route) {
      throw new NotFoundException('Route not found.');
    }
    return route;
  }

  async allRoutes() {
    const routes = await this.routeInterface.allRoutes();
    if (!routes) {
      return null;
    }
    return routes;
  }

  async updateStatus(data: UpdateStatus) {
    if (!data) {
      throw new BadRequestException();
    }
    const route = await this.routeInterface.seeRoute(data.routeId);

    if (!route) {
      throw new NotFoundException('Route not found.');
    }

    if (!route.canUpdateStatus(data.status)) {
      throw new BadRequestException(
        'It is not possible to repeat the same status.',
      );
    }

    return await this.routeInterface.updateStatus(data);
  }

  async deleteRoute(id: string) {
    const route = await this.routeInterface.seeRoute(id);
    if (!route) {
      throw new NotFoundException('Route not found.');
    }
    if (!route.canCancelRoute()) {
      throw new BadRequestException();
    }
    await this.routeInterface.deleteRoute(id);
    return {};
  }

  async assignRoute(data: AssignRoute) {
    const driver = await this.driverInterface.seeDriver(data.driverId);
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    const route = await this.routeInterface.seeRoute(data.id);
    if (!route) {
      throw new NotFoundException('Route not found.');
    }

    return await this.routeInterface.assignRoute(data);
  }

  async myRoutes(id: string) {
    const myRoutes = await this.routeInterface.myRoutes(id);

    if (!myRoutes) {
      return {};
    }

    return myRoutes;
  }

  async assignDeliveriesToRoute(data: AssignDeliveries) {
    const route = await this.routeInterface.seeRoute(data.routeId);
    if (!route) {
      throw new NotFoundException('Route not found.');
    }

    if (!data.deliveriesId || data.deliveriesId.length === 0) {
      throw new BadRequestException('Select at least 1 delivery.');
    }

    if (!route.canReceiveDeliveries()) {
      throw new BadRequestException(
        'This route cannot receive new deliveries in its current status.',
      );
    }

    return await this.deliveryInterface.assignToRoute(data);
  }
}
