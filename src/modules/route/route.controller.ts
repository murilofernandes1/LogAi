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
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { TypeGuard } from '../guards/type.guard.js';
import { RouteService } from './route.service.js';
import type {
  AssignRoute,
  RouteDTO,
  Status,
  UpdateStatus,
} from '../types/route.types.js';
import { Types } from '../decorators/type.decorator.js';

@Controller('routes')
@UseGuards(AuthGuard, RolesGuard, TypeGuard)
export class RouteController {
  constructor(private routeService: RouteService) {}

  // USER / ADMIN ROUTES

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

  @Delete('/:id')
  async deleteRoute(@Param('id') id: string) {
    return this.routeService.deleteRoute(id);
  }
}
