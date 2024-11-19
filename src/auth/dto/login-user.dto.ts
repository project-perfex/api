import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user',
    example: 'janedoe@email.com',
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
}
