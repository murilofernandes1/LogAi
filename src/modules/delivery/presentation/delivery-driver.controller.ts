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
import type { DeliveryStatus } from '../../../common/types/delivery.types.js';
import { DeliveryService } from '../application/delivery.service.js';
import { Types } from '../../../common/decorators/type.decorator.js';

@Controller('deliveries')
@UseGuards(AuthGuard, RoleGuard)
@UseGuards(AuthGuard)
@Types('DRIVER')
export class DeliveryDriverController {
  constructor(private deliveryService: DeliveryService) {}

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
}
