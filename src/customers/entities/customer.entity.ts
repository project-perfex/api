import { Customer, Opportunity, Order } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders?: Order[] | null;
  opportunity?: Opportunity[] | null;
  createdAt: Date;
  updatedAt: Date;
}
