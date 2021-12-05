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
import { DownloadFileDto } from './dto/download-file.request.dto';

@Controller({ path: 'file', version: '1' })
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: csvFileFilter,
      limits: {
        fileSize: 500000,
      },
    }),
  )
  upload(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.parseFileAndSave(uploadFileDto, file);
  }

  @Post('download/result')
  download(@Body() downloadFileDto: DownloadFileDto) {
    return this.fileService.downloadResult(downloadFileDto);
  }
}
