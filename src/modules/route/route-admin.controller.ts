import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { TypeGuard } from '../../common/guards/type.guard.js';
import { RouteService } from './route.service.js';
import type { AssignRoute, RouteDTO } from '../../common/types/route.types.js';
import { Types } from '../../common/decorators/type.decorator.js';
import { AssignDeliveries } from '../../common/types/delivery.types.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin/routes')
@UseGuards(AuthGuard, TypeGuard)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Types('USER')
export class RouteAdminController {
  constructor(private routeService: RouteService) {}

  @Post('create')
  async create(@Body() body: RouteDTO) {
    return this.routeService.create(body);
  }

  @Get('/:id')
  async getRoute(@Param('id') id: string) {
    return this.routeService.seeRoute(id);
  }

  @Get('/')
  async allRoutes() {
    return this.routeService.allRoutes();
  }

  @Patch('/:id/assign')
  async assignRoute(
    @Param('id') id: AssignRoute['id'],
    @Body() body: { driverId: AssignRoute['driverId'] },
  ) {
    return this.routeService.assignRoute({ id, driverId: body.driverId });
  }

  @Patch('/:id/deliveries')
  async assignDeliveriesToRoute(
    @Param('id') id: AssignDeliveries['routeId'],
    @Body() body: { deliveries: AssignDeliveries['deliveriesId'] },
  ) {
    return this.routeService.assignDeliveriesToRoute({
      routeId: id,
      deliveriesId: body.deliveries,
    });
  }

  @Delete('/:id')
  async deleteRoute(@Param('id') id: string) {
    return this.routeService.deleteRoute(id);
  }
}
