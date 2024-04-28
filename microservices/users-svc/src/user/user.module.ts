import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserController } from 'src/user/controllers/user.controller';
import { UserService } from 'src/user/services/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
