import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authJwtOptions } from 'src/common/auth/auth.jwt.options';
import { AuthService } from 'src/common/auth/auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
  controllers: [],
  imports: [JwtModule.register(authJwtOptions)],
})
export class AuthModule {}
