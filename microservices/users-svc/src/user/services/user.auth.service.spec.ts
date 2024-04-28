import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthService } from './user.auth.service';
import { DatabaseService } from '../../common/database/database.service';
import { AuthService } from '../../common/auth/auth.service';
import { authJwtOptions } from '../../common/auth/auth.jwt.options';
import { JwtModule } from '@nestjs/jwt';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let authService: AuthService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthService, AuthService, DatabaseService],
      imports: [JwtModule.register(authJwtOptions)],
    }).compile();

    service = module.get<UserAuthService>(UserAuthService);
    authService = module.get<AuthService>(AuthService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return null if user does not exist', async () => {
      // Arrange
      const data = { email: 'nonexistent@example.com', password: 'password' };
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(null);

      // Act
      const result = await service.login(data);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      // Arrange
      const data = { email: 'existing@example.com', password: 'invalid' };
      const user = {
        id: '1',
        email: 'existing@example.com',
        password: 'hashedPassword',
        name: 'John Doe',
        avatar: 'avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(authService, 'validateUser').mockResolvedValue(false);

      // Act
      const result = await service.login(data);

      // Assert
      expect(result).toBeNull();
    });

    it('should return an access token if login is successful', async () => {
      // Arrange
      const data = { email: 'existing@example.com', password: 'valid' };
      const user = {
        id: '1',
        email: 'existing@example.com',
        password: 'hashedPassword',
        name: 'John Doe',
        avatar: 'avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(databaseService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(authService, 'validateUser').mockResolvedValue(true);
      jest.spyOn(authService, 'createToken').mockResolvedValue('accessToken');

      // Act
      const result = await service.login(data);

      // Assert
      expect(result).toEqual({ accessToken: 'accessToken' });
    });
  });

  describe('register', () => {
    it('should create a new user and return an access token', async () => {
      // Arrange
      const data = {
        email: 'new@example.com',
        password: 'password',
        name: 'New User',
        avatar: 'avatar.png',
      };
      const passwordHash = 'hashedPassword';
      const user = {
        id: '1',
        email: 'new@example.com',
        password: passwordHash,
        name: 'New User',
        avatar: 'avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(authService, 'createPassword')
        .mockResolvedValue({ passwordHash, salt: 'salt' });
      jest.spyOn(databaseService.user, 'create').mockResolvedValue(user);
      jest.spyOn(authService, 'createToken').mockResolvedValue('accessToken');

      // Act
      const result = await service.register(data);

      // Assert
      expect(result).toEqual({ accessToken: 'accessToken' });
    });
  });
});
