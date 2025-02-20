import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
// Если вы используете JWT-guard, его нужно импортировать:

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  check(@Request() req) {
    return { user: req.user };
  }
}
