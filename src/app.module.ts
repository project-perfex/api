import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
