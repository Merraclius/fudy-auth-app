import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entity/User';
import { CreateUserDto } from './dto/create-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashService } from '../utils/hash/hash.service';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        HashService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create users', async () => {
    const expectedEmail = 'testEmail';

    const mockUser = new User();
    mockUser.email = expectedEmail;

    jest
      .spyOn(service, 'createUser')
      .mockImplementation(() => Promise.resolve(mockUser));

    const userDto = new CreateUserDto();
    userDto.email = expectedEmail;
    userDto.password = 'test';

    const result = await controller.registerUser(userDto);

    expect(result.email).toBe(expectedEmail);
  });
});
