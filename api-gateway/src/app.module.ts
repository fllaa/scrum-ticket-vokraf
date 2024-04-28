import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GrpcServerExceptionFilter } from '@flla/nestjs-grpc-exceptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { UserModule } from 'src/user/user.module';
import configs from 'src/configs';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
    }),
    TicketModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
