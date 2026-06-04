import {
  AssignRoute,
  RouteDTO,
  UpdateStatus,
} from '../../common/types/route.types.js';
import { Route } from './route.entity.js';

export abstract class RouteInterface {
  abstract create(data?: RouteDTO): Promise<Route>;
  abstract seeRoute(id: string): Promise<Route | null>;
  abstract allRoutes(): Promise<Route[] | null>;
  abstract assignRoute(data: AssignRoute): Promise<Route>;
  abstract deleteRoute(id: string);
  abstract myRoutes(id: string): Promise<Route[] | null>;
  abstract updateStatus(data: UpdateStatus): Promise<Route>;
}
