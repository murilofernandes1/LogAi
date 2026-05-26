import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CryptoInterface } from '../core/crypto/crypto.interface.js';
import { DriverInterface } from './driver.interface.js';
import { DriverDTO } from '../types/driver.types.js';

@Injectable()
export class DriverService {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverInterface: DriverInterface,
    private readonly cryptoInterface: CryptoInterface,
  ) {}

  async create(driverDto: DriverDTO) {
    if (!driverDto) {
      throw new Error('Fields cannot be empty.');
    }

    const driverAlreadyExists = await this.driverInterface.findDriverByEmail(
      driverDto.email,
    );

    if (driverAlreadyExists) {
      throw new UnauthorizedException('User already exists.');
    }

    const hashPassword = await this.cryptoInterface.hash(driverDto.password);

    const newDriver = await this.driverInterface.create({
      ...driverDto,
      password: hashPassword,
    });

    return newDriver;
  }

  async getDriver(id: string) {
    if (!id) {
      throw new Error('Id not provided.');
    }
    const driver = await this.driverInterface.seeDriver(id);

    if (!driver) {
      throw new Error('Driver not found.');
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
