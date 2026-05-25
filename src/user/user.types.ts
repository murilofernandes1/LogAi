export type UserResponse = {
  id: string;
  name: string;
  email: string;
  role: Role[];
};

export type UpdateRole = {
  id: string;
  role: Role;
};

export type Role = UserResponse & {
  role: 'ADMIN' | 'MANAGER' | 'ANALIST';
};
