import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { CategoryModule } from './categories/categories.module';
import { CategoryController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
  ],
  controllers: [UsersController, CategoryController, ProductsController],
  providers: [],
})
export class AppModule {}
