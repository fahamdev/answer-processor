import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../common/mocks/base-repository.mock';
import { Test as TestEntity } from './entities/test.entity';
import { TestsService } from './tests.service';

describe('TestsService', () => {
  let service: TestsService;
  let testRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestsService,
        {
          provide: getRepositoryToken(TestEntity),
          useValue: createMockRepository(),
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TestsService>(TestsService);
    testRepository = module.get<MockRepository>(getRepositoryToken(TestEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
