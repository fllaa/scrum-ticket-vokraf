import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../../common/database/database.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DatabaseService],
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
      avatar: expect.toBeOneOf([null, expect.any(String)]),
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    await service.delete(user.id);
  });

  it('should return a single user by id and the object properties should match', async () => {
    const user = await service.create({
      email: 'user@mail.com',
      password: 'password',
      name: 'User',
    });

    const foundUser = await service.get(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser).toEqual({
      id: user.id,
      email: 'user@mail.com',
      name: 'User',
      avatar: expect.toBeOneOf([null, expect.any(String)]),
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    await service.delete(user.id);
  });

  it('should return null when user is not found on delete', async () => {
    const result = await service.delete('non-existing-id');
    expect(result).toBeNull();
  });
});
