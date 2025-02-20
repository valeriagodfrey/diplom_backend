import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/users.entity';

interface WorkCreationAttrs {
  title: string;
  category: string;
  image: Buffer;
  author: string;
  userId: string;
}

@Table({ tableName: 'works' })
export class Work extends Model<Work, WorkCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @Column({
    type: DataType.BLOB('long'),
    allowNull: false,
  })
  image: Buffer;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isLiked: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFavorite: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
