import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateOrderProductDto } from '../dto/update-order-product.dto';
import { CreateOrderProductDto } from '../dto/create-order-product.dto';

@Injectable()
export class OrderProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderProductDto: CreateOrderProductDto) {
    const orderProduct = await this.prisma.orderProduct.create({
      data: {
        ...createOrderProductDto,
      },
    });

    return orderProduct;
  }

  async findAll() {
    const orderProducts = await this.prisma.orderProduct.findMany();

    return {
      data: orderProducts,
    };
  }

  async findOne(id: string) {
    const orderProduct = await this.prisma.orderProduct.findUnique({
      where: {
        id,
      },
    });

    return orderProduct;
  }

  async update(id: string, updateOrderProductDto: UpdateOrderProductDto) {
    const orderProduct = await this.prisma.orderProduct.update({
      where: {
        id,
      },
      data: {
        ...updateOrderProductDto,
      },
    });

    return orderProduct;
  }

  async remove(id: string) {
    const orderProduct = await this.prisma.orderProduct.delete({
      where: {
        id,
      },
    });

    return orderProduct;
  }
}
