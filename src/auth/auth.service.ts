import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.findUserByEmail(email);

    await this.verifyPassword(password, user.password);

    return this.generateToken(user.email, user.name, user.role);
  }

  async register(registerDto: RegisterUserDto): Promise<{ token: string }> {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const newUser = this.createUserEntity(registerDto, hashedPassword);

    const user = await this.usersService.create(newUser);

    return this.generateToken(user.email, user.name, user.role);
  }

  private async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private createUserEntity(
    registerDto: RegisterUserDto,
    hashedPassword: string,
  ): UserEntity {
    const user = new UserEntity();
    user.email = registerDto.email;
    user.password = hashedPassword;
    user.name = registerDto.name;
    user.phone = registerDto.phone;
    user.role = registerDto.role;
    return user;
  }

  private generateToken(
    email: string,
    name: string,
    role: string,
  ): { token: string; name: string; role: string } {
    const token = this.jwtService.sign({ email, name, role });
    return { token, name, role };
  }
}
