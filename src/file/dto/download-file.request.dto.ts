import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';
import { FileType } from '../enums/file.enum';

export class DownloadFileDto {
  @IsEnum(FileType, { message: 'Invalid File Type. Only CSV allowed.' })
  fileType?: FileType;

  @IsString()
  @MaxLength(8)
  examId: string;

  @IsEmail()
  candidateEmail: string;
}
