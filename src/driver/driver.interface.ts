import { DriverDTO, DriverResponse } from '../types/driver.types.js';

export abstract class DriverInterface {
  abstract create(data: DriverDTO): Promise<DriverDTO>;
  abstract findDriverByEmail(email: string): Promise<DriverResponse | null>;
}
