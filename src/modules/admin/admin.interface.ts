import { AdminResponse, AdminRoles } from '../../common/types/admin.types.js';

export abstract class AdminInterface {
  abstract updateAdminRole(
    id: string,
    role: AdminRoles,
  ): Promise<AdminResponse>;
  abstract getMe(id: string): Promise<AdminResponse>;
}
