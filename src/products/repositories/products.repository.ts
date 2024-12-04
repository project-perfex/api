import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        price: createProductDto.price,
        categoryId: createProductDto.categoryId,
      },
    });

    return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany();

    return {
      data: products,
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        title: updateProductDto.title,
        description: updateProductDto.description,
        price: updateProductDto.price,
        categoryId: updateProductDto.categoryId,
      },
    });

    return product;
  }

  async remove(id: string) {
    const product = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return product;
  }
}
