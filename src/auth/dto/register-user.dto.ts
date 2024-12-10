import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user',
    example: 'geraldobl58@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name',
    example: 'Geraldo Luiz',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Phone',
    example: 1234567890,
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role',
    example: 'ADMIN',
  })
  role: Role = Role.USER;
}
