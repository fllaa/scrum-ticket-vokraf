import { Module } from '@nestjs/common';
import { UserController } from 'src/user/controllers/user.controller';

@Module({
  controllers: [UserController],
})
export class UserModule {}
