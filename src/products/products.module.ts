import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repositories/products.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProductsService, ProductsRepository, PrismaService],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
