import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { JobEntity } from '../../src/entities/job.entity';
import { JobService } from '../../src/providers/job.service';
import { BookExportFormats } from '../../src/common/constants';

describe('JobService', () => {
  let service: JobService;
  let jobRepository: Repository<JobEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        JobService,
        {
          provide: getRepositoryToken(JobEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    jobRepository = module.get<Repository<JobEntity>>(
      getRepositoryToken(JobEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Method findJobs export', () => {
    //TODO implement DB mocks
  });

  describe('Method createJob import', () => {
    //TODO implement DB mocks
  });

  describe('Method createJob export', () => {
    //TODO implement DB mocks
  });

  describe('Method updateJobStatus', () => {
    //TODO implement DB mocks
  });
});
