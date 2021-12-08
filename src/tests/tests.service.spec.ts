import { CACHE_MANAGER, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../common/mocks/base-repository.mock';
import { Test as TestEntity } from './entities/test.entity';
import { TestStub } from './mocks/tests.mock';
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

  describe('findAll', () => {
    it('should return all Tests with answers', async () => {
      testRepository.find.mockResolvedValue([TestStub]);
      const tests = await service.findAll();
      expect(tests).toEqual([TestStub]);
    });
  });

  describe('findOne', () => {
    describe('when Test with Id exists', () => {
      it('should return the Test object', async () => {
        const id = 1;

        testRepository.findOne.mockResolvedValue(TestStub);
        const test = await service.findOne(id);
        expect(test).toEqual(TestStub);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const id = 500;
        testRepository.findOne.mockResolvedValue(null);

        try {
          await service.findOne(id);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toEqual(`Test not found with id - ${id}`);
        }
      });
    });
  });
});
