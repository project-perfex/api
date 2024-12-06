import { ApiProperty } from '@nestjs/swagger';
import { OpportunityStatus } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOpportunityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title',
    example: 'Sale of Notebook',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the product',
    example: 'Notebook Gamer Acer Nitro 5',
  })
  description: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price',
    example: 2500,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Status',
    example: 'OPEN',
  })
  status: OpportunityStatus;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'CustomeId',
    example: '019098bb-2e8a-4175-9047-f0851478e815',
  })
  customerId: string;
}
