import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoriesRepository } from './repositories/categories.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CategoryService, CategoriesRepository, PrismaService],
  exports: [CategoryService, CategoriesRepository],
})
export class CategoryModule {}
