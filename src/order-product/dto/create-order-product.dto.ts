import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Order ID',
    example: 'c0b05be3-43dd-4a03-a001-faf4a2324746',
  })
  orderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product ID',
    example: '836e36a5-d665-494b-92f8-82b3037c8577',
  })
  productId: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity',
    example: 1,
  })
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Total',
    example: 233,
  })
  total: number;
}
