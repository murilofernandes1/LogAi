export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  type: UserTypes;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
};

export type UpdateRole = {
  id: string;
  role: 'ADMIN' | 'USER';
};

export enum UserTypes {
  USER = 'USER',
  DRIVER = 'DRIVER',
}

export type UserRoles = 'ADMIN' | 'USER';
