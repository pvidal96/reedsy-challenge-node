import { Injectable } from '@nestjs/common';
import { JobEntity } from '../entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../dto/job.dto';
import { BookExportFormats } from '../common/constants';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepository: Repository<JobEntity>,
  ) {}

  /**
   * Returns either all the jobs or just import/export
   * @param type optional 'import'| 'export'
   * @returns Job[]
   */
  async listJobs(type: JobEntity['type']): Promise<Job[] | null> {
    //TODO This should return a Job Dto instead of the DB object, to mask sensitive data
    const jobs = await this.jobRepository
      .createQueryBuilder()
      .where({ type })
      .groupBy('id')
      .addGroupBy('status')
      .getMany();

    return jobs.map((job) => ({ ...job, data: JSON.parse(job.data) }));
  }

  /**
   * Create a new Job
   * @param type optional 'import'| 'export'
   * @returns Job['id']
   */
  async createJob(
    type?: Job['type'],
    data?: Job['data'],
  ): Promise<Pick<JobEntity, 'id'>> {
    const created = await this.jobRepository.create({
      type,
      data: JSON.stringify(data),
    });

    const inserted = await this.jobRepository.insert(created);

    return { id: inserted.identifiers[0].id };
  }

  /**
   * Updates a job status
   * @param id Job id
   * @param status new status
   */
  async updateJobStatus(
    id: JobEntity['id'],
    status: JobEntity['status'],
  ): Promise<void> {
    const job = await this.jobRepository.findOneBy({ id });

    job.status = status;

    await this.jobRepository.save(job);
  }

  /**
   * Executes all the pending jobs, this should be replaced for a real processor,
   * probably should be placed somewhere else
   * @param id Job id
   * @param status new status
   */
  async dummyJobExecute(): Promise<void> {
    const jobs = await this.jobRepository.findBy({ status: 'pending' });

    jobs.map((job) => {
      this.updateJobStatus(job.id, 'in-progress');

      let waitTimeSecs = 60;

      if (job.type === 'export') {
        const parseData: Job['data'] = JSON.parse(job.data);

        switch (parseData.type) {
          case BookExportFormats.pdf:
            waitTimeSecs = 25;
            break;
          case BookExportFormats.epub:
            waitTimeSecs = 10;
            break;
        }
      }

      setTimeout(() => {
        this.updateJobStatus(job.id, 'finished');
      }, waitTimeSecs * 1000);
    });
  }
}
