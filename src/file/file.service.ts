import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import { parse } from 'fast-csv';
import { CSVRowDto } from './dto/csv-row.dto';
import { Readable } from 'stream';
import { validate } from 'class-validator';
import {
  calculatePercentRank,
  CSVHeaders,
  getAverageScore,
  getScore,
} from './helpers/file.helper';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DownloadFileDto } from './dto/download-file.request.dto';
import { ExamResultDto } from './dto/exam-result.dto';
import { Test } from '../tests/entities/test.entity';
import { TestsService } from '../tests/tests.service';
@Injectable()
export class FileService {
  private readonly logger = new Logger('HTTP', {
    timestamp: true,
  });

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private testService: TestsService,
  ) {}

  parseFileAndSave(_uploadFileDto: UploadFileDto, file: Express.Multer.File) {
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
      //todo validate csv file
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
        this.parseRowAndSaveData(row);
        return;
      })
      .on('end', (rowCount: number) => {
        this.logger.log(`Parsed ${rowCount} rows`);
      });

    return {
      message: `File ${file.originalname} uploaded successfully.`,
    };
  }

  async parseRowAndSaveData(csvRowDto: CSVRowDto) {
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
      const answer = await this.testService.findAnswer(
        csvRowDto.examId,
        csvRowDto.questionNumber,
      );

      const newRow = this.fileRepository.create(csvRowDto);
      newRow.isCorrect = csvRowDto.answer === answer;
      return await this.fileRepository.save(newRow);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async downloadResult(downloadFileDto: DownloadFileDto) {
    const data = await this.fileRepository.find({
      where: {
        examId: downloadFileDto.examId,
      },
    });
    if (!data.length) {
      throw new NotFoundException(
        `No data found for Exam ID : ${downloadFileDto.examId}`,
      );
    }
    if (
      !data.find((row) => row.candidateEmail === downloadFileDto.candidateEmail)
    ) {
      throw new NotFoundException(
        `No data found for Exam ID : ${downloadFileDto.examId} and Candidate Email : ${downloadFileDto.candidateEmail}`,
      );
    }
    const test = await this.testService.findOneByExamId(downloadFileDto.examId);
    return this.prepareResult(data, downloadFileDto, test);
  }

  prepareResult(
    data: File[],
    downloadFileDto: DownloadFileDto,
    test: Test,
  ): ExamResultDto {
    const examResult = new ExamResultDto();

    examResult.examId = downloadFileDto.examId;

    examResult.candidateName = data.find(
      (row) => row.candidateEmail === downloadFileDto.candidateEmail,
    ).candidateName;

    examResult.candidateEmail = downloadFileDto.candidateEmail;

    const candidateScore = getScore(
      data.filter(
        (row) => row.candidateEmail === downloadFileDto.candidateEmail,
      ),
      test.numberOfQuestions,
    );
    examResult.score = candidateScore.toFixed(2);

    const otherCandidates = [
      ...new Set(
        data
          .filter(
            (item) => item.candidateEmail !== downloadFileDto.candidateEmail,
          )
          .map((item) => item.candidateEmail),
      ),
    ];

    const otherCandidatesScore: number[] = otherCandidates.map(
      (candidateEmail) => {
        return getScore(
          data.filter((row) => row.candidateEmail === candidateEmail),
          test.numberOfQuestions,
        );
      },
    );

    examResult.averageScore = getAverageScore(
      otherCandidatesScore,
      candidateScore,
    );

    examResult.percentRank = calculatePercentRank(
      [...otherCandidatesScore, candidateScore],
      candidateScore,
    );

    return examResult;
  }
}
