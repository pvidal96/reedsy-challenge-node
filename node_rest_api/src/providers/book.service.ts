import { Injectable } from '@nestjs/common';
import { BookImportOptions } from '../dto/bookImportOptions.dto';
import { JobService } from './job.service';
import { BookExportOptions } from '../dto/bookExportOptions.dto';
import { Job } from '../dto/job.dto';

@Injectable()
export class BookService {
  constructor(private jobService: JobService) {}

  /**
   * Creates a job to import a book
   * @param importOptions BookImportOptions
   */
  async importBook(importOptions: BookImportOptions): Promise<Pick<Job, 'id'>> {
    const newJobId = await this.jobService.createJob('import', importOptions);

    // Do some import specific logic

    this.jobService.dummyJobExecute();

    return newJobId;
  }

  /**
   * Creates a job to export a book
   * @param exportOptions BookExportOptions
   */
  async exportBook(exportOptions: BookExportOptions): Promise<Pick<Job, 'id'>> {
    const newJobId = await this.jobService.createJob('export', exportOptions);

    // Do some export specific logic

    this.jobService.dummyJobExecute();

    return newJobId;
  }
}
