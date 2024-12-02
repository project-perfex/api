import { Category, Order } from '@prisma/client';

export class CategoryEntity implements Category {
  id: string;
  title: string;
  orders?: Order[] | null;
  createdAt: Date;
  updatedAt: Date;
}
