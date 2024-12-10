import { OrderProduct } from '@prisma/client';

export class OrderProductEntity implements OrderProduct {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  total: number;
}
