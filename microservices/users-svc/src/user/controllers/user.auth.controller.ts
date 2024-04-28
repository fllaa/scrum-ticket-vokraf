import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { UserService } from 'src/user/services/user.service';

import type { UserCreateDto } from 'src/user/dtos/user.create.dto';
import { UserGetSerialization } from 'src/user/serializations/user.get.serialization';

@Controller()
export class UserAuthController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Create')
  create(data: UserCreateDto): Promise<UserGetSerialization> {
    return this.userService.create(data);
  }

  @GrpcMethod('UserService', 'Get')
  async get({ id }: { id: string }): Promise<UserGetSerialization> {
    const user = await this.userService.get(id);

    if (!user) {
      throw new RpcException({
        code: 404,
        message: 'User not found',
      });
    }

    return user;
  }

  @GrpcMethod('UserService', 'Delete')
  async delete({ id }: { id: string }): Promise<UserGetSerialization> {
    const user = await this.userService.delete(id);

    if (!user) {
      throw new RpcException({
        code: 404,
        message: 'User not found',
      });
    }

    return user;
  }
}
