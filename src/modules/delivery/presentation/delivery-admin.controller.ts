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
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { RoleGuard } from '../../../common/guards/role.guard.js';
import type {
  DeliveryDTO,
  UpdateDeliveryDTO,
} from '../../../common/types/delivery.types.js';
import { DeliveryService } from '../application/delivery.service.js';
import { Types } from '../../../common/decorators/type.decorator.js';

@Controller('admin/deliveries')
@UseGuards(AuthGuard, RoleGuard)
@UseGuards(AuthGuard)
@Types('ADMIN')
export class DeliveryAdminController {
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
