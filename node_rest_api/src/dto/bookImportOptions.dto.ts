import { IsEnum, IsString } from 'class-validator';
import { BookImportFormats } from '../common/constants';

/**
 * Represents the arguments received to import a book
 */
export class BookImportOptions {
  @IsString()
  bookId: string;

  @IsEnum(BookImportFormats, {
    message:
      'Type must be one of the following values: word, pdf, wattpad, evernote',
  })
  type: BookImportFormats;

  @IsString()
  url: string;
}
