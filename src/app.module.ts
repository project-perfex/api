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
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { OpportunitiesController } from './opportunities/opportunities.controller';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { OrderProductModule } from './order-product/order-product.module';
import { OrderProductController } from './order-product/order-product.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    CategoryModule,
    ProductsModule,
    CustomersModule,
    OpportunitiesModule,
    OrdersModule,
    OrderProductModule,
  ],
  controllers: [
    UsersController,
    CategoryController,
    ProductsController,
    CustomersController,
    OpportunitiesController,
    OrdersController,
    OrderProductController,
  ],
  providers: [],
})
export class AppModule {}
