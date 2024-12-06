import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './repositories/customers.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CustomersService, CustomersRepository, PrismaService],
  exports: [CustomersService, CustomersRepository],
})
export class CustomersModule {}
