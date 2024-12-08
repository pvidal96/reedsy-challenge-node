import { Injectable } from '@nestjs/common';
import { JobEntity } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/dto/job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepository: Repository<JobEntity>,
  ) {}

  /**
   * Returns either all the jobs or just import/export
   * @param type optional 'import'| 'export'
   * @returns JobEntity[]
   */
  async listJobs(type: JobEntity['type']): Promise<Job[] | null> {
    //TODO This should return a Job Dto instead of the DB object, to mask sensitive data
    const jobs = await this.jobRepository
      .createQueryBuilder()
      .where({ type })
      .groupBy('id')
      .addGroupBy('status')
      .getMany();
    console.warn('result', jobs);
    return jobs.map((job) => ({ ...job, data: JSON.parse(job.data) }));
  }

  /**
   * Create a new Job
   * @param type optional 'import'| 'export'
   * @returns JobEntity[]
   */
  async createJob(
    type?: Job['type'],
    data?: Job['data'],
  ): Promise<JobEntity['id']> {
    const created = await this.jobRepository.create({
      type,
      data: JSON.stringify(data),
    });

    const inserted = await this.jobRepository.insert(created);

    return inserted.identifiers[0].id;
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
}
