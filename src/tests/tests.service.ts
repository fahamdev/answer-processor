import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Test } from './entities/test.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async findOneByExamId(examId: string) {
    const cachedTests = await this.cacheManager.get('tests');
    if (cachedTests && cachedTests[examId]) {
      return cachedTests[examId];
    }

    const test = await this.testRepository.findOne({ where: { examId } });

    const newCachedTests = cachedTests ? cachedTests : {};
    newCachedTests[examId] = test;
    await this.cacheManager.set('tests', newCachedTests, { ttl: 3600 });

    if (!test) {
      throw new BadRequestException(`Test not found with examId - ${examId}`);
    }
    return test;
  }

  async findAnswer(examId: string, question: number): Promise<string> {
    const test = await this.findOneByExamId(examId);

    if (!test) {
      throw new BadRequestException(`Test not found with examId - ${examId}`);
    }
    return test.answers.find(
      (answer) => answer.question.toString() === question.toString(),
    ).answer;
  }
}
