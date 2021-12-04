import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class ExamResultDto {
  @IsString()
  @MaxLength(8)
  examId: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  averageScore: number;

  @IsEmail()
  candidateEmail: string;

  @IsString()
  candidateName: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  score: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  percentRank?: number;
}
