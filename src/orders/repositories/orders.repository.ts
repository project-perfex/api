import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
      },
    });

    return order;
  }

  async findAll() {
    const orders = await this.prisma.order.findMany();

    return {
      data: orders,
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        ...updateOrderDto,
      },
    });

    return order;
  }

  async remove(id: string) {
    const order = await this.prisma.order.delete({
      where: {
        id,
      },
    });

    return order;
  }
}
