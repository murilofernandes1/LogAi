import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CryptoInterface } from '../../common/core/crypto/crypto.interface.js';
import { DriverInterface } from './driver.interface.js';
import { DriverDTO } from '../../common/types/driver.types.js';

@Injectable()
export class DriverService {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverInterface: DriverInterface,
    private readonly cryptoInterface: CryptoInterface,
  ) {}

  async create(driverDto: DriverDTO) {
    const driverAlreadyExists = await this.driverInterface.findDriverByEmail(
      driverDto.email,
    );

    if (driverAlreadyExists) {
      throw new UnauthorizedException('Admin already exists.');
    }

    const hashPassword = await this.cryptoInterface.hash(driverDto.password);

    const newDriver = await this.driverInterface.create({
      ...driverDto,
      password: hashPassword,
    });

    return newDriver;
  }

  async getDriver(id: string) {
    const driver = await this.driverInterface.seeDriver(id);

    if (!driver) {
      throw new NotFoundException();
    }
    return driver;
  }

  async allDrivers() {
    const drivers = await this.driverInterface.allDrivers();
    if (!drivers) {
      return null;
    }

    return drivers;
  }
}
