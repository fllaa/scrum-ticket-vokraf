import { join } from 'path';
import { Transport, ClientOptions } from '@nestjs/microservices';

export const UserServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.USER_SERVICE_URL || 'localhost:3102',
    package: 'user',
    protoPath: join(__dirname, '../../_proto/user.proto'),
  },
};
