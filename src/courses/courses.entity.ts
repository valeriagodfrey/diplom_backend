import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CourseCreationAttrs {
  title: string;
  description: string;
  image: string;
  introLessonTitle: string;
  introLessonContent: string;
}

@Table({ tableName: 'courses' })
export class Course extends Model<Course, CourseCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  introLessonTitle: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  introLessonContent: string;
}
