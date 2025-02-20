import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Work } from '../works/works.entity';
import { CreateWorkDto, UpdateWorkDto } from './dto/work.dto';

@Injectable()
export class WorksService {
  constructor(
    @InjectModel(Work)
    private workModel: typeof Work,
  ) {}

  async findAll(): Promise<Work[]> {
    return await this.workModel.findAll();
  }

  async createWork(
    createWorkDto: CreateWorkDto & { image: Buffer; userId: string },
  ): Promise<Work> {
    const work = await this.workModel.create(createWorkDto);
    return work;
  }

  async findOne(id: number): Promise<Work> {
    const work = await this.workModel.findByPk(id);
    if (!work) {
      throw new NotFoundException(`Work with id ${id} not found`);
    }
    return work;
  }

  async updateWork(id: number, updateWorkDto: UpdateWorkDto): Promise<Work> {
    const work = await this.findOne(id);
    await work.update(updateWorkDto);
    return work;
  }

  async remove(id: number): Promise<{ message: string }> {
    const work = await this.findOne(id);
    await work.destroy();
    return { message: 'Work deleted successfully' };
  }
}
