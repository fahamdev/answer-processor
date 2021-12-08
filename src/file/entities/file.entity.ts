import { IsBoolean } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class File extends BaseEntity {
  @Column({ name: 'exam_id', length: 8 })
  examId: string;

  @Column({ type: 'date', name: 'exam_date' })
  examDate: Date;

  @Column({ name: 'candidate_email' })
  candidateEmail: string;

  @Column({ name: 'candidate_name' })
  candidateName: string;

  @Column({
    name: 'question_number',
    nullable: false,
  })
  questionNumber: number;

  @Column({
    nullable: true,
  })
  answer?: string;

  @Column({ name: 'is_correct' })
  @IsBoolean()
  isCorrect: boolean;
}
