import { IsEnum, IsString } from 'class-validator';
import { FileType } from '../enums/file.enum';

export class UploadFileDto {
  @IsEnum(FileType, { message: 'Invalid File Type. Only CSV allowed.' })
  fileType?: FileType;
}
