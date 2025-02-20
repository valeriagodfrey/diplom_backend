import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { WorksService } from './works.service';
import { CreateWorkDto, UpdateWorkDto } from './dto/work.dto';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  async getWorks() {
    return await this.worksService.findAll();
  }

  // Создание работы через загрузку файла
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async createWork(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWorkDto: CreateWorkDto,
  ) {
    // Здесь предполагается, что req.user содержит текущего пользователя
    // Если нет, можно получить userId из тела запроса (но это менее безопасно)
    const userId = createWorkDto['userId'];
    if (!userId) {
      throw new Error('User ID is required');
    }
    // Передаем бинарные данные файла без преобразования в base64
    const payload = { ...createWorkDto, image: file.buffer, userId };
    return await this.worksService.createWork(payload);
  }

  @Get(':id')
  async getWork(@Param('id') id: string) {
    return await this.worksService.findOne(+id);
  }

  @Put(':id')
  async updateWork(
    @Param('id') id: string,
    @Body() updateWorkDto: UpdateWorkDto,
  ) {
    return await this.worksService.updateWork(+id, updateWorkDto);
  }

  @Delete(':id')
  async deleteWork(@Param('id') id: string) {
    return await this.worksService.remove(+id);
  }

  // Дополнительный endpoint для получения работ текущего пользователя
  @Get('my/:userId')
  async getMyWorks(@Param('userId') userId: string) {
    const works = await this.worksService.findAll();
    return works.filter((work) => work.userId === userId);
  }
}
