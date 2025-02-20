// src/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/user/users.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    try {
      const user = await this.validateUser(userDto);
      return this.generateToken(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка входа. Проверьте данные.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async registration(userDto: CreateUserDto) {
    try {
      const emailCandidate = await this.userService.getUserByEmail(
        userDto.email,
      );
      if (emailCandidate) {
        throw new Error('Пользователь с таким email уже существует');
      }

      const nicknameCandidate = await this.userService.getUserByNickname(
        userDto.nickName,
      );
      if (nicknameCandidate) {
        throw new Error('Пользователь с таким логином уже существует');
      }

      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.createUser({
        ...userDto,
        password: hashPassword,
      });

      return this.generateToken(user);
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        error.message || 'Внутренняя ошибка сервера',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new Error('Некорректный email или пароль.');
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new Error('Некорректный email или пароль.');
  }
}
