import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.createCourse(createCourseDto);
  }

  @Get()
  async findAll() {
    return await this.coursesService.getAllCourses();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.coursesService.getCourseById(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.coursesService.updateCourse(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.coursesService.deleteCourse(+id);
  }
}
