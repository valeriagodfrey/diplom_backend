import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course)
    private courseModel: typeof Course,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseModel.create(createCourseDto);
    return course;
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.findAll();
  }

  async getCourseById(id: number): Promise<Course> {
    const course = await this.courseModel.findByPk(id);
    if (!course) {
      throw new HttpException(
        `Курс с таким id ${id} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async updateCourse(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const course = await this.getCourseById(id);
    await course.update(updateCourseDto);
    return course;
  }

  async deleteCourse(id: number): Promise<{ message: string }> {
    const course = await this.getCourseById(id);
    await course.destroy();
    return { message: 'Курс удален успешно' };
  }
}
