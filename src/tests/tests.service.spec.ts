import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../common/mocks/base-repository.mock';
import { Answer } from './entities/answer.entity';
import { Test as TestEntity } from './entities/test.entity';
import { TestsService } from './tests.service';

describe('TestsService', () => {
  let service: TestsService;
  let testRepository: MockRepository;
  let answerRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestsService,
        {
          provide: getRepositoryToken(TestEntity),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Answer),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<TestsService>(TestsService);
    testRepository = module.get<MockRepository>(getRepositoryToken(TestEntity));
    answerRepository = module.get<MockRepository>(getRepositoryToken(Answer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
