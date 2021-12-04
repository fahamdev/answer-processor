import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FileService {
  uploadCSV(uploadFileDto: UploadFileDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Upload valid CSV File.');
    }
    return {
      file: file.buffer.toString(),
    };
  }
}
