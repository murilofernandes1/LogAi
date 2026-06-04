import { Driver } from './driver.entity.js';
import { DriverDTO } from '../../common/types/driver.types.js';

export abstract class DriverInterface {
  abstract create(data: DriverDTO): Promise<Driver>;
  abstract seeDriver(id: string): Promise<Driver | null>;
  abstract allDrivers(): Promise<Driver[] | null>;
  abstract findDriverByEmail(email: string): Promise<Driver | null>;
}
