// src/communities/communities.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommunityDto, UpdateCommunityDto } from './dto/community.dto';
import { Community } from './community.entity';
import { User } from 'src/user/users.entity';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectModel(Community)
    private communityModel: typeof Community,
    @InjectModel(User)
    private userModel: typeof User,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Community[]> {
    return this.communityModel.findAll();
  }

  async findByUser(userId: string): Promise<Community[]> {
    return this.communityModel.findAll({ where: { userId } });
  }

  async findOne(id: number): Promise<Community> {
    const community = await this.communityModel.findByPk(id);
    if (!community) {
      throw new NotFoundException(`Community with id ${id} not found`);
    }
    return community;
  }

  async createCommunity(createCommunityDto: CreateCommunityDto) {
    const community = await this.communityModel.create(createCommunityDto);
    return community;
  }

  async updateCommunity(
    id: number,
    updateCommunityDto: UpdateCommunityDto,
  ): Promise<Community> {
    const community = await this.findOne(id);
    await community.update(updateCommunityDto);
    return community;
  }

  async removeCommunity(id: number): Promise<{ message: string }> {
    const community = await this.findOne(id);
    await community.destroy();
    return { message: 'Community deleted successfully' };
  }

  async joinCommunity(id: number, userId: string): Promise<Community> {
    const community = await this.findOne(id);
    const joinedUsers: string[] = community.joinedUsers || [];

    if (!joinedUsers.includes(userId)) {
      const newJoinedUsers = [...joinedUsers, userId];
      community.setDataValue('joinedUsers', newJoinedUsers);
      community.changed('joinedUsers', true);
      community.membersCount = community.membersCount + 1;
    }
    await community.save();

    await this.usersService.joinCommunity(userId, id);

    return community;
  }

  async leaveCommunity(id: number, userId: string): Promise<Community> {
    const community = await this.findOne(id);
    const joinedUsers: string[] = community.joinedUsers || [];
    if (joinedUsers.includes(userId)) {
      const newJoinedUsers = joinedUsers.filter((uid) => uid !== userId);
      community.setDataValue('joinedUsers', newJoinedUsers);
      community.changed('joinedUsers', true);
      community.membersCount =
        community.membersCount > 0 ? community.membersCount - 1 : 0;
    }
    await community.save();

    await this.usersService.leaveCommunity(userId, id);

    return community;
  }
  async getCommunityById(id: number): Promise<Community> {
    return this.findOne(id);
  }
}
