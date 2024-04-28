import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  OnModuleInit,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from '@flla/nestjs-grpc-exceptions';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserService } from '../interfaces/user.service.interface';
import { UserServiceClientOptions } from '../options/user.client.options';

@Controller('users')
export class UserController implements OnModuleInit {
  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService =
      this.userServiceClient.getService<UserService>('UserService');
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  create(@Body() data: UserCreateDto) {
    return this.userService.create(data);
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  get(@Param('id') id: string) {
    return this.userService.get({ id });
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  delete(@Param('id') id: string) {
    return this.userService.delete({ id });
  }
}
