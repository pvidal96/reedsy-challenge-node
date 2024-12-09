import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from '../../src/controllers/job.controller';
import { JobService } from '../../src/providers/job.service';
import { JobEntity } from '../../src/entities/job.entity';
import {
  BookExportFormats,
  BookImportFormats,
} from '../../src/common/constants';
import { Job } from '../../src/dto/job.dto';

describe('JobController', () => {
  let controller: JobController;
  let service: JobService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useFactory: () => ({
            listJobs: jest.fn((arg: JobEntity['type']) =>
              Promise.resolve(arg === 'export' ? EXPORT_ITEMS : IMPORT_ITEMS),
            ),
          }),
        },
      ],
    }).compile();

    controller = app.get<JobController>(JobController);
    service = app.get<JobService>(JobService);
  });

  describe('Api listExportJobs', () => {
    it('it calling listExportJobs method', async () => {
      const items: Job[] = await controller.listExportJobs();
      expect(items).toBeDefined();
      expect(items.length).toEqual(2);
      expect(items).toEqual(EXPORT_ITEMS);
    });

    it('if calling listExportJobs and receive a specific error', async () => {
      jest.spyOn(controller, 'listExportJobs').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await controller.listExportJobs();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual('async error');
      }
    });
  });

  describe('Api listImportJobs', () => {
    it('it calling listImportJobs method', async () => {
      const items: Job[] = await controller.listImportJobs();
      expect(items).toBeDefined();
      expect(items.length).toEqual(2);
      expect(items).toEqual(IMPORT_ITEMS);
    });

    it('if calling listImportJobs and receive a specific error', async () => {
      jest.spyOn(controller, 'listImportJobs').mockImplementation(() => {
        throw new Error('async error');
      });
      try {
        await controller.listImportJobs();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual('async error');
      }
    });
  });
});

const EXPORT_ITEMS: JobEntity[] = [
  {
    id: 1,
    type: 'export',
    status: 'in-progress',
    data: JSON.stringify({
      bookId: 'aBookExportId',
      type: BookExportFormats.epub,
    }),
    errorMsg: null,
    created_at: new Date('2024-12-08T19:24:49.705Z'),
    updated_at: new Date('2024-12-08T19:24:59.732Z'),
  },
  {
    id: 2,
    type: 'export',
    status: 'finished',
    data: JSON.stringify({
      bookId: 'aBookExportId',
      type: BookExportFormats.epub,
    }),
    errorMsg: null,
    created_at: new Date('2024-12-08T19:24:50.703Z'),
    updated_at: new Date('2024-12-08T19:25:00.729Z'),
  },
];

const IMPORT_ITEMS: JobEntity[] = [
  {
    id: 3,
    type: 'import',
    status: 'pending',
    data: JSON.stringify({
      bookId: 'aBookExportId',
      type: BookImportFormats.word,
      url: 'someUrl.com',
    }),
    errorMsg: null,
    created_at: new Date('2024-12-08T19:24:49.705Z'),
    updated_at: new Date('2024-12-08T19:24:59.732Z'),
  },
  {
    id: 4,
    type: 'import',
    status: 'finished',
    data: JSON.stringify({
      bookId: 'aBookExportId',
      type: BookImportFormats.wattpad,
      url: 'someUrl.com',
    }),
    errorMsg: null,
    created_at: new Date('2024-12-08T19:24:50.703Z'),
    updated_at: new Date('2024-12-08T19:25:00.729Z'),
  },
];
