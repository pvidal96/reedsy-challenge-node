import { JobEntity } from '../entities/job.entity';
import { BookImportOptions } from './bookImportOptions.dto';
import { BookExportOptions } from './bookExportOptions.dto';

/**
 * Represents the displayable job
 */
export type Job = Omit<JobEntity, 'data'> & {
  data: BookImportOptions | BookExportOptions;
};
