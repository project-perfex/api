import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly repository: ProductsRepository,
    private readonly prisma: PrismaService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.repository.create(createProductDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    title?: string;
    category?: string;
  }): Promise<{
    data: any[];
    meta: { total: number; page: number; limit: number };
  }> {
    const { page = 1, limit = 5, title, category } = query;

    const where: { title?: object; category?: object } = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (category) {
      where.category = {
        OR: [
          {
            id: {
              equals: category,
            },
          },
          {
            title: {
              contains: category,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    try {
      const [total, products] = await Promise.all([
        this.prisma.product.count({ where }),
        this.prisma.product.findMany({
          where,
          skip: (page - 1) * limit,
          take: Number(limit),
          orderBy: {
            title: 'asc',
          },
          include: {
            orderItems: true,
            category: true,
          },
        }),
      ]);

      return {
        data: products,
        meta: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.repository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
