import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(
    private readonly repository: CustomersRepository,
    private readonly prisma: PrismaService,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.repository.create(createCustomerDto);
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
  }): Promise<{
    data: any[];
    meta: { total: number; page: number; limit: number };
  }> {
    const { page = 1, limit = 10, name, email } = query;

    const where: { name?: object; email?: object } = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (email) {
      where.email = {
        contains: email,
        mode: 'insensitive',
      };
    }

    try {
      const [total, customers] = await Promise.all([
        this.prisma.customer.count({ where }),
        this.prisma.customer.findMany({
          where,
          skip: (page - 1) * limit,
          take: Number(limit),
          orderBy: {
            name: 'asc',
          },
        }),
      ]);

      return {
        data: customers,
        meta: {
          total,
          page,
          limit,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.repository.update(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
