// src/communities/community.entity.ts
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/user/users.entity';

interface CommunityCreationAttrs {
  name: string;
  category: string;
  description?: string;
  userId: string;
}

@Table({ tableName: 'communities' })
export class Community extends Model<Community, CommunityCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Post)
  posts: Post[];

  // Количество участников
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  membersCount: number;

  // Массив ID пользователей, присоединившихся к сообществу
  @Column({
    type: DataType.ARRAY(DataType.UUID),
    allowNull: false,
    defaultValue: [],
  })
  joinedUsers: string[];
}
