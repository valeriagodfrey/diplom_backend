// src/users/users.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // Эндпоинт для вступления пользователя в сообщество
  @Post(':id/join-community')
  joinCommunity(
    @Param('id') userId: string,
    @Body() body: { communityId: number },
  ) {
    return this.usersService.joinCommunity(userId, body.communityId);
  }

  // Эндпоинт для выхода пользователя из сообщества
  @Delete(':id/leave-community')
  leaveCommunity(
    @Param('id') userId: string,
    @Body() body: { communityId: number },
  ) {
    return this.usersService.leaveCommunity(userId, body.communityId);
  }
}
