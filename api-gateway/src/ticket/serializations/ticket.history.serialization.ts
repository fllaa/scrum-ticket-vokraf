import { Type } from 'class-transformer';
import { TicketUserSerialization } from 'src/ticket/serializations/ticket.user.serialization';

export class TicketHistorySerialization {
  @Type(() => String)
  id: string;

  @Type(() => TicketUserSerialization)
  user: TicketUserSerialization;

  @Type(() => String)
  title: string;

  @Type(() => String)
  createdAt: string;
}
