import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [SequelizeModule.forFeature([Course])],
  exports: [CoursesService],
})
export class CoursesModule {}
