// src/communities/communities.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCommunityDto, UpdateCommunityDto } from './dto/community.dto';
import { CommunitiesService } from './community.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getAll() {
    return await this.communitiesService.findAll();
  }

  @Post()
  async create(@Body() createCommunityDto: CreateCommunityDto) {
    return await this.communitiesService.createCommunity(createCommunityDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return await this.communitiesService.updateCommunity(
      +id,
      updateCommunityDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.communitiesService.removeCommunity(+id);
  }

  @Get('my/:userId')
  async getMyCommunities(@Param('userId') userId: string) {
    return await this.communitiesService.findByUser(userId);
  }

  @Post(':id/join')
  async joinCommunity(
    @Param('id') id: string,
    @Body() body: { userId: string },
  ) {
    return await this.communitiesService.joinCommunity(+id, body.userId);
  }

  @Delete(':id/leave')
  async leaveCommunity(
    @Param('id') id: string,
    @Body() body: { userId: string },
  ) {
    return await this.communitiesService.leaveCommunity(+id, body.userId);
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.communitiesService.getCommunityById(+id);
  }
}
