import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GrpcAlreadyExistsException,
  GrpcUnauthenticatedException,
} from '@flla/nestjs-grpc-exceptions';
import { Prisma } from '@prisma/client';
import { UserAuthService } from 'src/user/services/user.auth.service';
import { UserAuthSerialization } from 'src/user/serializations/user.auth.serialization';

import type { UserLoginDto } from 'src/user/dtos/user.login.dto';
import type { UserRegisterDto } from 'src/user/dtos/user.register.dto';

@Controller()
export class UserAuthController {
  constructor(
    @Inject(UserAuthService) private readonly userAuthService: UserAuthService,
  ) {}

  @GrpcMethod('UserService', 'Login')
  async login(data: UserLoginDto): Promise<UserAuthSerialization> {
    const result = await this.userAuthService.login(data);

    if (!result) {
      throw new GrpcUnauthenticatedException('Email or password is incorrect');
    }

    return result;
  }

  @GrpcMethod('UserService', 'Register')
  async register(data: UserRegisterDto): Promise<UserAuthSerialization> {
    try {
      const result = await this.userAuthService.register(data);

      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new GrpcAlreadyExistsException('Email already exists');
        }
      }
    }
  }
}
