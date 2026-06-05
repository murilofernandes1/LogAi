export class Auth {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: string,
    public readonly phone: number | null,
    public readonly licensePlate: string | null,
    public readonly status: string,

    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
