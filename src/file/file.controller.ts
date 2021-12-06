import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { csvFileFilter } from './helpers/file.helper';
import { DownloadFileDto } from './dto/download-file.request.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller({ path: 'file', version: '1' })
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileType: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
  @Header('Content-Type', 'application/octet-stream')
  @Header('Content-Disposition', 'attachment; filename="result.csv')
  async download(
    @Body() downloadFileDto: DownloadFileDto,
  ): Promise<StreamableFile> {
    return await this.fileService.downloadResult(downloadFileDto);
  }
}
