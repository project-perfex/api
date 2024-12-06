import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { CategoryModule } from './categories/categories.module';
import { CategoryController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersController } from './customers/customers.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    CustomersModule,
  ],
  controllers: [
    UsersController,
    CategoryController,
    ProductsController,
    CustomersController,
  ],
  providers: [],
})
export class AppModule {}
