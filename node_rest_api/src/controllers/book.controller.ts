import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { BookExportOptions } from 'src/dto/bookExportOptions.dto';
import { BookImportOptions } from 'src/dto/bookImportOptions.dto';
import { Job } from 'src/dto/job.dto';
import { BookService } from 'src/providers/book.service';

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
  ): Promise<Job['id'] | null> {
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
  ): Promise<Job['id'] | null> {
    return this.bookService.exportBook(exportOptions);
  }
}
