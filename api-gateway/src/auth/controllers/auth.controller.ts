import {
  Body,
  Controller,
  Header,
  OnModuleInit,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcToHttpInterceptor } from '@flla/nestjs-grpc-exceptions';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { IAuthService } from 'src/auth/interfaces/auth.service.interface';
import { UserServiceClientOptions } from '../../common/options/client.options';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client(UserServiceClientOptions)
  private readonly userServiceClient: ClientGrpc;

  private authService: IAuthService;

  onModuleInit() {
    this.authService =
      this.userServiceClient.getService<IAuthService>('UserService');
  }

  @Post('login')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(GrpcToHttpInterceptor)
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
