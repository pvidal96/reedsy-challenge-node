import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { JobService } from '../providers/job.service';
import { Job } from '../dto/job.dto';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  /**
   * List import jobs
   * @param type JobType 'import' | 'export'
   * @returns Job[]
   */
  @HttpCode(HttpStatus.OK)
  @Get('import')
  listImportJobs(): Promise<Job[] | null> {
    return this.jobService.listJobs('import');
  }

  /**
   * List all jobs
   * @param type JobType 'import' | 'export'
   * @returns Job[]
   */
  @HttpCode(HttpStatus.OK)
  @Get('export')
  listExportJobs(): Promise<Job[] | null> {
    return this.jobService.listJobs('export');
  }
}
