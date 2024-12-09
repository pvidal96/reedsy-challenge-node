import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobEntity } from '../../src/entities/job.entity';
import { BookService } from '../../src/providers/book.service';
import { JobService } from '../../src/providers/job.service';
import { Job } from '../../src/dto/job.dto';
import {
  BookExportFormats,
  BookImportFormats,
} from '../../src/common/constants';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BookService,
        {
          provide: JobService,
          useFactory: () => ({
            createJob: jest.fn((type?: Job['type'], data?: Job['data']) =>
              Promise.resolve(
                (type === 'import' || type === 'export') && JSON.stringify(data) // TODO validate correct format?
                  ? { id: 1 }
                  : null,
              ),
            ),
            dummyJobExecute: jest.fn(() => Promise.resolve()),
          }),
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Method importBook works', () => {
    it('it calling importBook method', async () => {
      const result = await service.importBook({
        bookId: '1',
        type: BookImportFormats.word,
        url: '',
      });
      expect(result).toBeDefined();
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('Method exportBook works', () => {
    it('it calling exportBook method', async () => {
      const result = await service.exportBook({
        bookId: '1',
        type: BookExportFormats.pdf,
      });
      expect(result).toBeDefined();
      expect(result).toEqual({ id: 1 });
    });
  });
});
