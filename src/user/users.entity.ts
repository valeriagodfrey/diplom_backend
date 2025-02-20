// src/users/users.entity.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  nickName: string;
  role: 'user' | 'mentor';
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secondName: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  nickName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: 'mentor' | 'user';

  // Другие поля…
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dob?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  postalCode?: string;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
    defaultValue: [],
  })
  joinedCommunities: number[];
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
    defaultValue: [],
  })
  favoriteWorks: number[];
}
