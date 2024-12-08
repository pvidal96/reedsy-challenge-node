import { Injectable } from '@nestjs/common';
import { BookImportOptions } from 'src/dto/bookImportOptions.dto';
import { JobService } from './job.service';
import { BookExportOptions } from 'src/dto/bookExportOptions.dto';
import { Job } from 'src/dto/job.dto';
import { BookExportFormats } from 'src/common/constants';

@Injectable()
export class BookService {
  constructor(private jobService: JobService) {}

  /**
   * Creates a job to import a book
   * @param importOptions BookImportOptions
   */
  async importBook(importOptions: BookImportOptions): Promise<Job['id']> {
    const newJobId = await this.jobService.createJob('import', importOptions);

    // Do some import specific logic

    this.jobService.dummyJobExecute();

    return newJobId;
  }

  /**
   * Creates a job to export a book
   * @param exportOptions BookExportOptions
   */
  async exportBook(exportOptions: BookExportOptions): Promise<Job['id']> {
    const newJobId = await this.jobService.createJob('export', exportOptions);

    // Do some export specific logic

    this.jobService.dummyJobExecute();

    return newJobId;
  }
}
