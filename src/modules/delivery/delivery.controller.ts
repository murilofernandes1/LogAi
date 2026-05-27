import {
  Controller,
  UseGuards,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { TypeGuard } from '../guards/type.guard.js';
import { Roles } from '../decorators/role.decorator.js';
import type {
  DeliveryDTO,
  DeliveryStatus,
  UpdateDeliveryDTO,
} from '../types/delivery.types.js';
import { DeliveryService } from './delivery.service.js';

@Controller('deliveries')
@UseGuards(AuthGuard, RolesGuard, TypeGuard)
@Roles('ADMIN')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Post('create')
  async create(@Body() body: DeliveryDTO) {
    return this.deliveryService.createDelivery(body);
  }

  @Get('/')
  async getDeliveries() {
    return this.deliveryService.seeDeliveries();
  }

  @Get('/:id')
  async getDelivery(@Param('id') id: string) {
    if (id.length < 7) {
      return this.deliveryService.seeDeliveryByCode(id);
    }
    return this.deliveryService.seeDelivery(id);
  }

  @Patch('/:id/status')
  async updateDeliveryStatus(
    @Param('id') id: string,
    @Body() body: { status: DeliveryStatus },
  ) {
    return this.deliveryService.updateDeliveryStatus({
      id,
      status: body.status,
    });
  }

  @Patch('/:id')
  async updateDeliveryFields(
    @Param('id') id: string,
    @Body() body: UpdateDeliveryDTO,
  ) {
    return this.deliveryService.updateDeliveryFields(id, body);
  }

  @Delete('/:id')
  async cancelDelivery(@Param('id') id: string) {
    return this.deliveryService.cancelDelivery(id);
  }
}
