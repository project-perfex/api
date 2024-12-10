import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductRepository } from './repositories/order-product.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OrderProductService, OrderProductRepository, PrismaService],
  exports: [OrderProductService, OrderProductRepository],
})
export class OrderProductModule {}
