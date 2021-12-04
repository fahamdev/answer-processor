import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import { parse } from 'fast-csv';
import { CSVRowDto } from './dto/csv-row.dto';
import { Readable } from 'stream';
import { validate } from 'class-validator';
import { CSVHeaders } from './helpers/file.helper';
@Injectable()
export class FileService {
  private readonly logger = new Logger('HTTP', {
    timestamp: true,
  });

  uploadCSV(uploadFileDto: UploadFileDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Upload valid CSV File.');
    }

    // fs.createReadStream(file.buffer)
    //   .pipe(parse({ delimiter: '|', ignoreEmpty: true, headers: true }))
    //   .validate((data: CreateFileDto): boolean => {
    //     console.log('123', data);
    //     return false;
    //   })
    //   .on('error', (error) => console.error(error))
    //   .on('data', (row) => console.log(`${row}`))
    //   .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

    const readable = new Readable();
    readable._read = () => {
      this.logger.debug('reading csv file');
    };
    readable.push(Buffer.from(file.buffer));
    readable.push(null);

    readable
      .pipe(parse({ delimiter: '|', ignoreEmpty: true, headers: CSVHeaders }))
      .validate((data: CSVRowDto): boolean => {
        const csvRow = new CSVRowDto();
        // csvRow.examId = data.examId;
        Object.assign(csvRow, data);
        validate(csvRow).then((errors) => {
          // errors is an array of validation errors
          if (errors.length > 0) {
            console.log('validation failed. errors: ', errors);
            return false;
          }
        });
        return true;
      })
      .on('error', (error) => console.error(error))
      .on('data', (row) => console.log(`${JSON.stringify(row)}`))
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

    return {
      file: file.buffer.toString(),
    };
  }
}
