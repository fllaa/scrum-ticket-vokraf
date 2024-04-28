import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { authJwtOptions } from 'src/auth/options/auth.jwt.options';

@Module({
  controllers: [AuthController],
  imports: [JwtModule.register(authJwtOptions)],
})
export class AuthModule {}
