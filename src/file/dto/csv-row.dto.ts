import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { ExamID } from '../enums/file.enum';
import { ExamExistsRule } from '../validators/ExamExistsRule.validator';

export class CSVRowDto {
  @IsString()
  // @IsEnum(ExamID)
  @Validate(ExamExistsRule)
  examId: string;

  @IsString()
  @IsDateString()
  examDate: string;

  @IsEmail()
  candidateEmail: string;

  @IsString()
  candidateName: string;

  @IsString()
  @IsNumberString()
  @Matches(/^([1-9][0-9]?[0-9]?)$/)
  questionNumber: number;

  @IsString()
  @IsOptional()
  @Matches(/[A-E]/)
  answer?: string;
}
