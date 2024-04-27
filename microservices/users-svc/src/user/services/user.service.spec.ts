import { Test, TestingModule } from '@nestjs/testing';
import { RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return the user object', async () => {
    const user = await service.create({
      email: 'user@mail.com',
      password: 'password',
      name: 'User',
    });

    expect(user).toBeDefined();
    expect(user).toEqual({
      id: expect.any(String),
      email: 'user@mail.com',
      name: 'User',
      avatar: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    await service.delete(user.id);
  });

  it('should return a single user by id and the object properties should match', async () => {
    const user = await service.create({
      email: 'user@mail.com',
      password: 'password',
      confirmPassword: 'password',
      name: 'User',
    });

    const foundUser = await service.get(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser).toEqual({
      id: user.id,
      email: 'user@mail.com',
      name: 'User',
      avatar: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    await service.delete(user.id);
  });

  it('should throw a RpcException when a user is not found', () => {
    expect(() => service.delete('999')).toThrow(RpcException);
  });
});
