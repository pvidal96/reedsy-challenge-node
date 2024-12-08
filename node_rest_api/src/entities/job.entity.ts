import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'jobs' })
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: 'import' | 'export';

  @Column({ nullable: false, default: 'pending' })
  status: 'pending' | 'in-progress' | 'finished' | 'error';

  @Column({ nullable: false })
  data: string;

  @Column({ nullable: true })
  errorMsg?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
