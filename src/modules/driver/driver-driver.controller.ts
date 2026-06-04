import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { DriverService } from './driver.service.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { TypeGuard } from '../../common/guards/type.guard.js';
import { CurrentUser } from '../../common/decorators/user.decorator.js';
import { Types } from '../../common/decorators/type.decorator.js';

@ApiTags('Drivers')
@ApiBearerAuth()
@Controller('drivers')
@UseGuards(AuthGuard, TypeGuard)
@UseGuards(AuthGuard)
@Types('DRIVER')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('/me')
  async getMe(@CurrentUser('id') id: string) {
    return this.driverService.getDriver(id);
  }
}
