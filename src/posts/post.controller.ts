// src/posts/posts.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { PostsService } from './post.service';

@Controller('communities/:communityId/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Param('communityId') communityId: string) {
    return await this.postsService.findAllByCommunity(+communityId);
  }

  @Post()
  async createPost(
    @Param('communityId') communityId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    // Принудительно устанавливаем communityId из параметра маршрута
    return await this.postsService.createPost({
      ...createPostDto,
      communityId: +communityId,
    });
  }

  @Delete(':postId')
  async removePost(@Param('postId') postId: string) {
    return await this.postsService.removePost(+postId);
  }
}
