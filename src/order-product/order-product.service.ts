import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProductRepository } from './repositories/order-product.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderProductService {
  constructor(
    private readonly repository: OrderProductRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createOrderProductDto: CreateOrderProductDto) {
    return await this.repository.create(createOrderProductDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    order?: string;
    product?: string;
  }): Promise<{
    data: any[];
    meta: { total: number; page: number; limit: number };
  }> {
    const { page = 1, limit = 10, order, product } = query;

    const where: {
      order?: object;
      product?: object;
    } = {};

    if (order) {
      where.order = {
        OR: [
          {
            id: {
              equals: order,
            },
          },
          {
            name: {
              contains: order,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (product) {
      where.product = {
        OR: [
          {
            id: {
              equals: product,
            },
          },
          {
            name: {
              contains: product,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    try {
      const [total, ordersProducts] = await Promise.all([
        this.prisma.orderProduct.count({ where }),
        this.prisma.orderProduct.findMany({
          where,
          skip: (page - 1) * limit,
          take: Number(limit),
          include: {
            order: true,
            product: true,
          },
        }),
      ]);

      return {
        data: ordersProducts,
        meta: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch order product: ${error.message}`);
    }
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateOrderProductDto: UpdateOrderProductDto) {
    return await this.repository.update(id, updateOrderProductDto);
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
