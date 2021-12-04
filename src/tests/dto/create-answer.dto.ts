import { IsEnum, IsNumber } from 'class-validator';
import { Answers } from '../enums/answers.enum';

export class CreateAnswerDto {
  @IsNumber()
  readonly question: number;

  @IsEnum(Answers, { message: 'Answer must be A, B, C, D or E' })
  readonly answer: string;
}
