import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { User } from '../common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByPhone(phoneNumber);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(loginDto: { phoneNumber: string; password: string }) {
    const user = await this.validateUser(loginDto.phoneNumber, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { phoneNumber: user.phoneNumber, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
}