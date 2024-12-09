import { IsEnum, IsString } from 'class-validator';
import { BookExportFormats } from '../common/constants';

/**
 * Represents the arguments received to export a book
 */
export class BookExportOptions {
  @IsString()
  bookId: string;

  @IsEnum(BookExportFormats, {
    message: 'Type must be one of the following values: epub, pdf',
  })
  type: BookExportFormats;
}
