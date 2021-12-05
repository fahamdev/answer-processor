import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../common/mocks/base-repository.mock';
import { TestsService } from '../tests/tests.service';
import { File } from './entities/file.entity';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;
  let filesRepository: MockRepository;
  let mockTestsService: Partial<TestsService>;

  beforeEach(async () => {
    mockTestsService = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getRepositoryToken(File),
          useValue: createMockRepository(),
        },
        {
          provide: TestsService,
          useValue: mockTestsService,
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
    filesRepository = module.get<MockRepository>(getRepositoryToken(File));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
