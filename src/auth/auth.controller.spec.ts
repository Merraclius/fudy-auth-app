import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { UsersService } from '../users/users.service';
import { HashService } from '../utils/hash/hash.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        HashService,
        JwtStrategy,
        JwtService,
        LocalStrategy,
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
