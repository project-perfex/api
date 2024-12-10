import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './repositories/orders.repository';
import { PrismaService } from 'src/prisma/prisma.service';

enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.repository.create(createOrderDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    title?: string;
    status?: string;
    user?: string;
    customer?: string;
  }): Promise<{
    data: any[];
    meta: { total: number; page: number; limit: number };
  }> {
    const { page = 1, limit = 10, title, status, user, customer } = query;

    const where: {
      title?: object;
      status?: object;
      user?: object;
      customer?: object;
    } = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
      where.status = {
        equals: status,
      };
    }

    if (user) {
      where.user = {
        OR: [
          {
            id: {
              equals: user,
            },
          },
          {
            name: {
              contains: user,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    if (customer) {
      where.customer = {
        OR: [
          {
            id: {
              equals: customer,
            },
          },
          {
            name: {
              contains: customer,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    try {
      const [total, orders] = await Promise.all([
        this.prisma.order.count({ where }),
        this.prisma.order.findMany({
          where,
          skip: (page - 1) * limit,
          take: Number(limit),
          orderBy: {
            title: 'asc',
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            customer: true,
          },
        }),
      ]);

      return {
        data: orders,
        meta: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.repository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.repository.remove(id);
  }
}
