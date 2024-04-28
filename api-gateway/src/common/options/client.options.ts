import { join } from 'path';
import { Transport, ClientOptions } from '@nestjs/microservices';

export const TicketServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.TICKET_SERVICE_URL || 'localhost:3101',
    package: 'ticket',
    protoPath: join(__dirname, '../../_proto/ticket.proto'),
  },
};

export const UserServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.USER_SERVICE_URL || 'localhost:3102',
    package: 'user',
    protoPath: join(__dirname, '../../_proto/user.proto'),
  },
};
