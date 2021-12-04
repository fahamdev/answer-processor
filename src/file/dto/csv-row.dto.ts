import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Answers } from '../../tests/enums/answers.enum';

export class CSVRowDto {
  @IsString()
  @MaxLength(8)
  @MinLength(3)
  examId: string;

  @IsString()
  examDate: string;

  @IsEmail()
  candidateEmail: string;

  @IsString()
  candidateName: string;

  @IsString()
  questionNumber: number;

  @IsEnum(Answers, { message: 'Answer must be A, B, C, D or E' })
  @IsOptional()
  answer?: string;
}
