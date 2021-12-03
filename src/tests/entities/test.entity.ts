import { IsOptional } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Answer } from './answer.entity';

@Entity()
export class Test extends BaseEntity {
  @Column({
    unique: true,
    nullable: false,
    name: 'exam_id',
    length: 8,
  })
  examId: string;

  @Column({
    default: 0,
    name: 'number_of_questions',
  })
  numberOfQuestions: number;

  @OneToMany(() => Answer, (answer) => answer.test, {
    eager: true,
  })
  @IsOptional()
  answers?: Answer[];
}
