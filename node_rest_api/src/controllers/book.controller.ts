import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { BookExportOptions } from '../dto/bookExportOptions.dto';
import { BookImportOptions } from '../dto/bookImportOptions.dto';
import { Job } from '../dto/job.dto';
import { BookService } from '../providers/book.service';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  /**
   * Creates an import job given a book
   * @param importOptions BookImportOptions
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('import')
  importBook(
    @Body() importOptions: BookImportOptions,
  ): Promise<Pick<Job, 'id'> | null> {
    return this.bookService.importBook(importOptions);
  }

  /**
   * Creates an export job given a book
   * @param exportOptions BookExportOptions
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('export')
  exportBook(
    @Body() exportOptions: BookExportOptions,
  ): Promise<Pick<Job, 'id'> | null> {
    return this.bookService.exportBook(exportOptions);
  }
}
