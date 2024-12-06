import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        orders: {
          create: createCustomerDto.orders,
        },
      },
    });

    return customer;
  }

  async findAll() {
    const customers = await this.prisma.customer.findMany();

    return {
      data: customers,
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...updateCustomerDto,
        orders: {
          create: updateCustomerDto.orders,
        },
      },
    });

    return customer;
  }

  async remove(id: string) {
    const customer = await this.prisma.customer.delete({
      where: {
        id,
      },
    });

    return customer;
  }
}
