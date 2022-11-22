import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/entity/User';
import { HashModule } from '../src/utils/hash/hash.module';

describe('users', () => {
  const usersRepoMock = {
    create: jest.fn(),
    save: jest.fn(),
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule, HashModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(usersRepoMock)
      .compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe(`/POST users`, () => {
    it('should create user', () => {
      const expectedEmail = 'test@mail.com';

      usersRepoMock.save.mockReturnValueOnce({
        email: expectedEmail,
      });

      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: expectedEmail,
          password: 'password',
        })
        .expect(201)
        .expect({
          email: expectedEmail,
        });
    });

    describe('check validations', () => {
      it('wrong email format', () => {
        return request(app.getHttpServer())
          .post('/users')
          .send({
            email: 'wrongformatofemail',
            password: 'password',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: ['email must be an email'],
            error: 'Bad Request',
          });
      });
      it('password is too short', () => {
        return request(app.getHttpServer())
          .post('/users')
          .send({
            email: 'test@email.com',
            password: 'pass',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: [
              "Password can't be less than 5 characters and more than 20",
            ],
            error: 'Bad Request',
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
