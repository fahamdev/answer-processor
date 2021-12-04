import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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

  @IsString()
  @IsOptional()
  answer?: string;
}
