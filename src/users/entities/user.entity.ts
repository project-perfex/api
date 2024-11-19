import { Order, Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: Role;
  orders?: Order[] | null;
  createdAt: Date;
  updatedAt: Date;
}
