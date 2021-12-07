import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TestsService } from '../../tests/tests.service';

@ValidatorConstraint({ name: 'ExamExists', async: true })
@Injectable()
export class ExamExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly testsService: TestsService) {}

  async validate(value: string) {
    try {
      await this.testsService.findOneByExamId(value);
    } catch (error) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Test doesn't exist`;
  }
}
