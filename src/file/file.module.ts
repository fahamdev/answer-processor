import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { TestsModule } from '../tests/tests.module';
import { Test } from '../tests/entities/test.entity';
import { ExamExistsRule } from './validators/ExamExistsRule.validator';

@Module({
  imports: [TypeOrmModule.forFeature([File, Test]), TestsModule],
  controllers: [FileController],
  providers: [FileService, ExamExistsRule],
})
export class FileModule {}
