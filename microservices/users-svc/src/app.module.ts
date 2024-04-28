import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GrpcServerExceptionFilter } from '@flla/nestjs-grpc-exceptions';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserModule } from 'src/user/user.module';
import { authJwtOptions } from 'src/common/auth/auth.jwt.options';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    JwtModule.register(authJwtOptions),
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class AppModule {}
