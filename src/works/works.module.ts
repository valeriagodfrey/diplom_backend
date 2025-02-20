import { Module } from '@nestjs/common';
import { Work } from './works.entity';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Work])],
  providers: [WorksService],
  controllers: [WorksController],
  exports: [WorksService],
})
export class WorksModule {}
