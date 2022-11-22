import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { HashService } from '../utils/hash/hash.service';

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  const mockFunctions = {
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockFunctions,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findById', () => {
    it('UserRepository:findOneBy called with expected parameters', async () => {
      const expectedId = 42;
      await service.findById(expectedId);

      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: expectedId,
      });
    });

    it('method return corrected users', async () => {
      const expectedUser = new User();
      expectedUser.email = 'testEmail';
      expectedUser.password = 'hashedPassword';

      mockFunctions.findOneBy.mockReturnValueOnce(expectedUser);

      expect(await service.findById(42)).toBe(expectedUser);
    });
  });
});
