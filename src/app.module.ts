import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { CategoryModule } from './categories/categories.module';
import { CategoryController } from './categories/categories.controller';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, CategoryModule],
  controllers: [UsersController, CategoryController],
  providers: [],
})
export class AppModule {}
