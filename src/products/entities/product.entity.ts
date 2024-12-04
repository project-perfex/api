import { OrderProduct, Product } from '@prisma/client';

export class ProductEntity implements Product {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  orderItems?: OrderProduct[] | null;
  createdAt: Date;
  updatedAt: Date;
}
