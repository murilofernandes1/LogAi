import { Status } from '../types/driver.types.js';
import {
  AssignRoute,
  RouteDTO,
  RouteResponse,
  UpdateStatus,
} from '../types/route.types.js';

export abstract class RouteInterface {
  abstract create(data?: RouteDTO): Promise<RouteResponse>;
  abstract seeRoute(id: string): Promise<RouteResponse | null>;
  abstract allRoutes(): Promise<RouteResponse[] | null>;
  abstract assignRoute(data: AssignRoute): Promise<RouteResponse>;
  abstract deleteRoute(id: string);

  abstract myRoutes(id: string): Promise<RouteResponse[] | null>;
  abstract updateStatus(data: UpdateStatus): Promise<RouteResponse>;
}
