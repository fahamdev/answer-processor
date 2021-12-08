import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateTestDto {
  @IsString()
  @MaxLength(8)
  @MinLength(3)
  readonly examId: string;

  @IsNumber()
  readonly numberOfQuestions: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  readonly answers: CreateAnswerDto[];
}
