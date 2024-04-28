import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { TicketController } from 'src/ticket/controllers/ticket.controller';
import { TicketService } from 'src/ticket/services/ticket.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
