import { Module } from '@nestjs/common';
import { BookController } from 'src/controllers/book.controller';
import { BookService } from 'src/providers/book.service';
import { JobModule } from './job.module';

@Module({
  imports: [JobModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
