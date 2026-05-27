import { DriverDTO, DriverResponse } from '../../common/types/driver.types.js';

export abstract class DriverInterface {
  abstract create(data: DriverDTO): Promise<DriverDTO>;
  abstract seeDriver(id: string): Promise<DriverResponse | null>;
  abstract allDrivers(): Promise<DriverResponse[] | null>;
  abstract findDriverByEmail(email: string): Promise<DriverResponse | null>;
}
