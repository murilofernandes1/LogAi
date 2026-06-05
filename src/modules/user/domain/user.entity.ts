import { Roles } from '../../../common/types/user.types.js';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: Roles,
    public readonly phone: number | null,
    public readonly licensePlate: string | null,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
