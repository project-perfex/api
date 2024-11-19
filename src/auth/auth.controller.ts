import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);

      return response.status(200).json({
        status: 'Success!',
        message: 'User logged in successfully',
        data: result,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal server error',
      });
    }
  }

  @Post('/register')
  async register(
    @Body() registerDto: RegisterUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerDto);

      return response.status(200).json({
        status: 'Success!',
        message: 'Successfully registered user',
        data: result,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal server error',
      });
    }
  }
}
