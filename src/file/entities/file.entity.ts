import { Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Answers } from '../../tests/enums/answers.enum';

export class File extends BaseEntity {
  @Column({ name: 'exam_id', length: 8 })
  examId: string;

  @Column({ type: 'date', name: 'exam_date' })
  examDate: Date;

  @Column('candidate_email')
  candidateEmail: string;

  @Column('candidate_name')
  candidateName: string;

  @Column({
    name: 'question_number',
    nullable: false,
  })
  questionNumber: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Answers,
  })
  answer?: string;
}
