export class RouteDTO {
  driverId?: string;
}

export class AssignRoute {
  driverId: string;
  id: string;
}

export class UpdateStatus {
  status: Status;
  id: string;
}

export class RouteResponse {
  id: string;
  status: string;
  driverId: string | null;
  createdAt: Date;
  deliveries?: [];
}
export type Status = 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'CANCELLED';
