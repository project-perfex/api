import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './repositories/categories.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly repository: CategoriesRepository,
    private readonly prisma: PrismaService,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.repository.create(createCategoryDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    title?: string;
  }): Promise<{
    data: any[];
    meta: { total: number; page: number; limit: number };
  }> {
    const { page = 1, limit = 10, title } = query;

    const where: { title?: object } = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    try {
      const [total, categories] = await Promise.all([
        this.prisma.category.count({ where }),
        this.prisma.category.findMany({
          where,
          skip: (page - 1) * limit,
          take: Number(limit),
          orderBy: {
            title: 'asc',
          },
        }),
      ]);

      return {
        data: categories,
        meta: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.repository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
