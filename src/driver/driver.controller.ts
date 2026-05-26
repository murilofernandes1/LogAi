import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { DriverService } from './driver.service.js';
import type { DriverDTO } from '../types/driver.types.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { TypeGuard } from '../guards/type.guard.js';
import { Roles } from '../decorators/role.decorator.js';

@Controller('driver')
@UseGuards(AuthGuard, RolesGuard, TypeGuard)
export class DriverController {
  constructor(private driverService: DriverService) {}

  @Roles('ADMIN')
  @Post('create')
  async create(@Body() body: DriverDTO) {
    return this.driverService.create(body);
  }

  @Roles('ADMIN')
  @Get('/:id')
  async getDriver(@Param('id') id: string) {
    return this.driverService.getDriver(id);
  }

  @Roles('ADMIN')
  @Get('/')
  async allDrivers() {
    return this.driverService.allDrivers();
  }
}
