import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Answers } from '../enums/answers.enum';
import { Test } from './test.entity';

@Entity()
export class Answer extends BaseEntity {
  @Column({
    nullable: false,
  })
  question: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Answers,
  })
  answer: string;

  @ManyToOne(() => Test, (test) => test.answers)
  @JoinColumn({
    name: 'test_id',
  })
  test: Test;
}
