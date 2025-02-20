// src/posts/posts.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Community } from 'src/community/community.entity';
import { User } from 'src/user/users.entity';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { Post } from './post.entity';

@Module({
  imports: [SequelizeModule.forFeature([Post, Community, User])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
