import { Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
