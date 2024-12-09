import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from '../controllers/job.controller';
import { JobEntity } from '../entities/job.entity';
import { JobService } from '../providers/job.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
