import { Order, OrderStatus } from '@prisma/client';

export class OrderEntity implements Order {
  id: string;
  title: string;
  notes: string;
  payment: string;
  total: number;
  status: OrderStatus;
  address: string;
  userId: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;
}
