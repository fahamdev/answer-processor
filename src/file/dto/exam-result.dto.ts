import { IsEmail, IsString, MaxLength } from 'class-validator';

export class ExamResultDto {
  @IsString()
  @MaxLength(8)
  examId: string;

  @IsString()
  averageScore: string;

  @IsEmail()
  candidateEmail: string;

  @IsString()
  candidateName: string;

  @IsString()
  score: string;

  @IsString()
  percentRank?: string;
}
