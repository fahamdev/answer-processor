import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { Answer } from './entities/answer.entity';
import { Test } from './entities/test.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async findAll() {
    return await this.testRepository.find();
  }

  async findOne(id: number) {
    const test = await this.testRepository.findOne(id);
    if (!test) {
      throw new BadRequestException(`Test not found with id - ${id}`);
    }
    return test;
  }
}
