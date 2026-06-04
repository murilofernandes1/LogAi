import { RouteStatus } from '../../common/types/route.types.js';
export class Route {
  constructor(
    public readonly id: string,
    public readonly status: RouteStatus,
    public readonly driverId: string | null,
    public readonly createdAt: Date,
  ) {}

  canReceiveDeliveries(): boolean {
    return this.status === RouteStatus.PENDING;
  }

  canUpdateStatus(newStatus: RouteStatus): boolean {
    return this.status !== newStatus;
  }

  canCancelRoute(): boolean {
    return this.status !== RouteStatus.IN_PROGRESS;
  }
}
