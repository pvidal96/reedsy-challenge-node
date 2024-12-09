import { Module } from '@nestjs/common';
import { BookController } from '../controllers/book.controller';
import { BookService } from '../providers/book.service';
import { JobModule } from './job.module';

@Module({
  imports: [JobModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
