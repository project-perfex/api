import { ApiProperty } from '@nestjs/swagger';
import { Opportunity, Order } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name',
    example: 'Jane Doe',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail',
    example: 'email@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Phone',
    example: '1234567890',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Address',
    example: '123 Main St',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Orders',
    example: '1, 2, 3',
  })
  orders: Order[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Orders',
    example: '1, 2, 3',
  })
  opportunity: Opportunity[];
}
