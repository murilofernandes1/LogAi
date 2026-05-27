import { Body, Controller, Param, Post, Get, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DriverService } from './driver.service.js';
import type { DriverDTO } from '../types/driver.types.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { TypeGuard } from '../guards/type.guard.js';
import { Roles } from '../decorators/role.decorator.js';
import { CurrentUser } from '../decorators/user.decorator.js';
import { Types } from '../decorators/type.decorator.js';
import { RouteService } from '../route/route.service.js';
import { UpdateStatus } from '../types/route.types.js';

@ApiTags('Drivers')
@ApiBearerAuth()
@Controller('drivers')
@UseGuards(AuthGuard, RolesGuard, TypeGuard)
export class DriverController {
  constructor(
    private readonly driverService: DriverService,
    private readonly routeService: RouteService,
  ) {}

  // USER/ADMIN ROUTES

  @Types('USER')
  @Post('create')
  async create(@Body() body: DriverDTO) {
    return this.driverService.create(body);
  }

  @Types('USER')
  @Get('/:id')
  async getDriver(@Param('id') id: string) {
    return this.driverService.getDriver(id);
  }

  @Types('USER')
  @Get('/')
  async allDrivers() {
    return this.driverService.allDrivers();
  }

  // DRIVER ROUTES

  @Types('DRIVER')
  @Get('/me')
  async getMe(@CurrentUser('id') id: string) {
    return this.driverService.getDriver(id);
  }

  @Types('DRIVER')
  @Get('/routes')
  async myRoutes(@CurrentUser('id') id: string) {
    return this.routeService.myRoutes(id);
  }

  @Patch('/routes/:id/status')
  @ApiOperation({ summary: 'Update route status' })
  async updateStatus(
    @Param('id') id: UpdateStatus['id'],
    @Body() body: { status: UpdateStatus['status'] },
  ) {
    return this.routeService.updateStatus({ id, status: body.status });
  }
}
