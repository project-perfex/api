import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title',
    example: 'Notebook Gamer',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Notes',
    example: 'Notebook Gamer com 16GB de RAM',
  })
  notes: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment',
    example: 'Credit Card',
  })
  payment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Status',
    example: 'PENDING',
  })
  status: OrderStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Address',
    example: 'Rua A, 123',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User ID',
    example: '12d5f4f3-89b4-443b-879d-b3fd18c870e4',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer ID',
    example: '7d7b0d09-5eb5-4818-8b99-9d0f867711f6',
  })
  customerId: string;
}
