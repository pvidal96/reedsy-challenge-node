import { Module } from '@nestjs/common';
import { JobModule } from './job.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book.module';
import { TypeOrmModule } from '../datasource/typeorm.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule, BookModule, JobModule],
})
export class AppModule {}
