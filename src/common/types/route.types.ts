export class RouteDTO {
  driverId?: string;
}

export class AssignRoute {
  driverId: string;
  id: string;
}
export enum RouteStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
export class UpdateStatus {
  status: RouteStatus;
  routeId: string;
}

export class RouteResponse {
  id: string;
  status: string;
  driverId: string | null;
  createdAt: Date;
  deliveries?: [];
}
