import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { csvFileFilter } from './helpers/file.helper';

@Controller({ path: 'file', version: '1' })
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/csv')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: csvFileFilter,
      limits: {
        fileSize: 500000,
      },
    }),
  )
  uploadCSV(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadCSV(uploadFileDto, file);
  }
}
