import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
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
    description: 'Description',
    example: 'Notebook Gamer Acer Nitro 5',
  })
  description: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Price',
    example: 4500,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category',
    example: 'd8c10c01-d77c-4452-be4b-5254369ebcd3',
  })
  categoryId?: string;
}
