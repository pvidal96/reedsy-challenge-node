import { Test, TestingModule } from '@nestjs/testing';
import { Job } from '../../src/dto/job.dto';
import { BookController } from '../../src/controllers/book.controller';
import { BookService } from '../../src/providers/book.service';
import { BookImportOptions } from '../../src/dto/bookImportOptions.dto';
import { BookExportOptions } from '../../src/dto/bookExportOptions.dto';
import { BookImportFormats } from '../../src/common/constants';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useFactory: () => ({
            importBook: jest.fn((importOptions: BookImportOptions) =>
              Promise.resolve({ id: 1 }),
            ),
            exportBook: jest.fn((exportOptions: BookExportOptions) =>
              Promise.resolve({ id: 1 }),
            ),
          }),
        },
      ],
    }).compile();

    controller = app.get<BookController>(BookController);
    service = app.get<BookService>(BookService);
  });

  describe('Api importBook', () => {
    const importBookOptions: BookImportOptions = {
      bookId: 'bookId',
      type: BookImportFormats.word,
      url: 'someUrl.com',
    };

    it('it calling importBook method', async () => {
      const created = await controller.importBook(importBookOptions);
      expect(created).toBeDefined();
      expect(created).toEqual({ id: 1 });
    });

    it('if calling importBook and receive a validation error', async () => {
      jest.spyOn(controller, 'importBook').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await controller.importBook(importBookOptions);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual('async error');
      }
    });
  });
});
