import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type {
  AdminRoles,
  AdminResponse,
} from '../../common/types/admin.types.js';
import { AdminInterface } from './admin.interface.js';

@Injectable()
export class AdminService {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminInterface: AdminInterface,
  ) {}

  async updateAdminRole(id: string, role: AdminRoles) {
    if (!role) {
      throw new BadRequestException();
    }
    const updatedRole = await this.adminInterface.updateAdminRole(id, role);
    return updatedRole;
  }

  async getMe(id: string) {
    const me = await this.adminInterface.getMe(id);
    return me;
  }
}
