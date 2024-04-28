import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserAuthController } from 'src/user/controllers/user.auth.controller';
import { UserController } from 'src/user/controllers/user.controller';
import { UserAuthService } from 'src/user/services/user.auth.service';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [UserController, UserAuthController],
  providers: [UserService, UserAuthService],
})
export class UserModule {}
