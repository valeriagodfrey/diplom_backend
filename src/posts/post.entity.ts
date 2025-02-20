// src/posts/posts.entity.ts
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Community } from 'src/community/community.entity';

import { User } from 'src/user/users.entity';

interface PostCreationAttrs {
  title: string;
  content: string;
  tags?: string[];
  image?: string;
  communityId: number;
  userId: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // Новый заголовок поста
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  // Форматированный контент поста
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  // Массив тегов (используем PostgreSQL – ARRAY)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  tags: string[];

  @ForeignKey(() => Community)
  @Column({ type: DataType.INTEGER, allowNull: false })
  communityId: number;

  @BelongsTo(() => Community)
  community: Community;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
