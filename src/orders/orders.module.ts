import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OrdersService, OrdersRepository, PrismaService],
  exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
