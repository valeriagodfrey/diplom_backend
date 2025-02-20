// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async findAllByCommunity(communityId: number): Promise<Post[]> {
    return this.postModel.findAll({ where: { communityId } });
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postModel.create(createPostDto);
    return post;
  }

  async removePost(id: number): Promise<{ message: string }> {
    const post = await this.postModel.findByPk(id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    await post.destroy();
    return { message: 'Post deleted successfully' };
  }
}
