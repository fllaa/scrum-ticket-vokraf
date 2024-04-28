import { Type } from 'class-transformer';
import { TicketHistorySerialization } from 'src/ticket/serializations/ticket.history.serialization';
import { TicketListSerialization } from 'src/ticket/serializations/ticket.list.serialization';
import { TicketUserSerialization } from 'src/ticket/serializations/ticket.user.serialization';

export class TicketGetSerialization extends TicketListSerialization {
  @Type(() => TicketUserSerialization)
  creator: TicketUserSerialization;

  @Type(() => TicketUserSerialization)
  assignees: TicketUserSerialization[];

  @Type(() => TicketHistorySerialization)
  histories: TicketHistorySerialization[];
}
