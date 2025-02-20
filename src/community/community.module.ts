import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Community } from './community.entity';
import { User } from 'src/user/users.entity';
import { UsersModule } from 'src/user/users.module';
import { CommunitiesService } from './community.service';
import { CommunitiesController } from './community.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Community, User]),
    forwardRef(() => UsersModule),
  ],
  providers: [CommunitiesService],
  controllers: [CommunitiesController],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
