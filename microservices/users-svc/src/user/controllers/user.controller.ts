import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from 'src/user/services/user.service';

import type { UserCreateDto } from 'src/user/dtos/user.create.dto';
import { UserGetSerialization } from 'src/user/serializations/user.get.serialization';
import { Prisma } from '@prisma/client';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
  GrpcUnknownException,
} from '@flla/nestjs-grpc-exceptions';

@Controller()
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Create')
  async create(data: UserCreateDto): Promise<UserGetSerialization> {
    try {
      const user = await this.userService.create(data);
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new GrpcAlreadyExistsException('User already exists');
        }
      }

      throw new GrpcUnknownException('Unknown error');
    }
  }

  @GrpcMethod('UserService', 'Get')
  async get({ id }: { id: string }): Promise<UserGetSerialization> {
    const user = await this.userService.get(id);

    if (!user) {
      throw new GrpcNotFoundException('User not found');
    }

    return user;
  }

  @GrpcMethod('UserService', 'Delete')
  async delete({ id }: { id: string }): Promise<UserGetSerialization> {
    const user = await this.userService.delete(id);

    if (!user) {
      throw new GrpcNotFoundException('User not found');
    }

    return user;
  }
}
