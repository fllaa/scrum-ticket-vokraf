import { Module } from '@nestjs/common';
import { TicketController } from 'src/ticket/controllers/ticket.controller';

@Module({
  controllers: [TicketController],
})
export class TicketModule {}
