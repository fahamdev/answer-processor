import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import { parse } from 'fast-csv';
import { CSVRowDto } from './dto/csv-row.dto';
import { Readable } from 'stream';
import { validate } from 'class-validator';
import { CSVHeaders } from './helpers/file.helper';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class FileService {
  private readonly logger = new Logger('HTTP', {
    timestamp: true,
  });

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  uploadCSV(uploadFileDto: UploadFileDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Upload valid CSV File.');
    }

    const readable = new Readable();
    readable._read = () => {
      this.logger.debug('reading csv file');
    };
    readable.push(Buffer.from(file.buffer));
    readable.push(null);

    readable
      .pipe(
        parse({
          delimiter: '|',
          ignoreEmpty: true,
          headers: CSVHeaders,
          trim: true,
          renameHeaders: true,
        }),
      )
      // .validate((data: CSVRowDto): boolean => {
      //   const csvRow = new CSVRowDto();
      //   // csvRow.examId = data.examId;
      //   Object.assign(csvRow, data);
      //   validate(csvRow).then((errors) => {
      //     // errors is an array of validation errors
      //     if (errors.length > 0) {
      //       console.log('validation failed. errors: ', errors);
      //       return false;
      //     }
      //   });
      //   return true;
      // })
      .on('error', (error) => console.error(error))
      .on('data', (row) => {
        console.log(`${JSON.stringify(row)}`);
        try {
          this.saveRow(row);
        } catch (error) {
          this.logger.error(error);
        }
        return;
      })
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

    return {
      file: file.buffer.toString(),
    };
  }

  async saveRow(csvRowDto: CSVRowDto) {
    const existingRow = await this.fileRepository.findOne({
      examId: csvRowDto.examId,
      candidateEmail: csvRowDto.candidateEmail,
      candidateName: csvRowDto.candidateName,
      questionNumber: csvRowDto.questionNumber,
    });
    if (existingRow) {
      return;
    }
    try {
      const newRow = this.fileRepository.create(csvRowDto);
      return await this.fileRepository.save(newRow);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
