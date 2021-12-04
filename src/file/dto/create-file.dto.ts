import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Answers } from '../../tests/enums/answers.enum';

export class CreateFileDto {
  @IsString()
  @MaxLength(8)
  @MinLength(3)
  examId: string;

  @IsDate()
  examDate: Date;

  @IsEmail()
  candidateEmail: string;

  @IsString()
  candidateName: string;

  @IsNumber()
  questionNumber: number;

  @IsEnum(Answers, { message: 'Answer must be A, B, C, D or E' })
  @IsOptional()
  answer?: string;
}
