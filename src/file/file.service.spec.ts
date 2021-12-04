import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../common/mocks/base-repository.mock';
import { File } from './entities/file.entity';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;
  let filesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getRepositoryToken(File),
          useValue: createMockRepository(),
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
