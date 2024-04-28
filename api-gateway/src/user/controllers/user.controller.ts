import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  OnModuleInit,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from '@flla/nestjs-grpc-exceptions';
import { UserCreateDto } from '../dtos/user.create.dto';
import { IUserService } from '../interfaces/user.service.interface';
import { UserServiceClientOptions } from '../../common/options/client.options';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth.user.decorator';

@Controller('users')
export class UserController implements OnModuleInit {
  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private userService: IUserService;

  onModuleInit() {
    this.userService =
      this.userServiceClient.getService<IUserService>('UserService');
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  create(@Body() data: UserCreateDto) {
    return this.userService.create(data);
  }

  @Get('me')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  me(@AuthUser() { sub }: { sub: string }) {
    return this.userService.get({ id: sub });
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  get(@Param('id') id: string) {
    return this.userService.get({ id });
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.userService.delete({ id });
  }
}
