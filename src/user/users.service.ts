// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserByNickname(nickName: string) {
    const user = await this.userRepository.findOne({
      where: { nickName },
      include: { all: true },
    });
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await user.update(updateUserDto);
    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async joinCommunity(userId: string, communityId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    // Создаем новый массив из текущего (если он undefined, получаем пустой массив)
    const joined: number[] = user.joinedCommunities
      ? [...user.joinedCommunities]
      : [];
    if (!joined.includes(communityId)) {
      const newJoined = [...joined, communityId];
      user.setDataValue('joinedCommunities', newJoined);
      user.changed('joinedCommunities', true);
      await user.save();
    }
    return user;
  }

  async leaveCommunity(userId: string, communityId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const joined: number[] = user.joinedCommunities
      ? [...user.joinedCommunities]
      : [];
    const newJoined = joined.filter((id) => id !== communityId);
    user.setDataValue('joinedCommunities', newJoined);
    user.changed('joinedCommunities', true);
    await user.save();
    return user;
  }
}
