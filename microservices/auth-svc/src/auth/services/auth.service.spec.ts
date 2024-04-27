import { Test, TestingModule } from '@nestjs/testing';
import { RpcException } from '@nestjs/microservices';
import { faker } from '@faker-js/faker';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an object with a token property on login', async () => {
    const data = {
      email: 'user@mail.com',
      password: 'password',
    };

    const response = await service.login(data);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('token');
  });

  it('should throw a RpcException when email not found or password is not match', async () => {
    const data = {
      email: 'arae5e5tyet5@nraerwaa.com',
      password: '1414rfaes5weatgsed',
    };

    expect(() => service.login(data)).rejects.toThrow(RpcException);
  });

  it('should return an object with a token property on register', async () => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      confirmPassword: faker.internet.password(),
      name: faker.person.fullName(),
    };

    const response = await service.register(data);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('token');
  });

  it('should throw a RpcException when email already exists', async () => {
    const data = {
      email: 'user@mail.com',
      password: 'password',
      confirmPassword: 'password',
      name: 'User',
    };

    expect(() => service.register(data)).rejects.toThrow(RpcException);
  });

  it('should throw a RpcException when password and confirmPassword do not match', async () => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      confirmPassword: faker.internet.password(),
      name: faker.person.fullName(),
    };

    expect(() => service.register(data)).rejects.toThrow(RpcException);
  });
});
