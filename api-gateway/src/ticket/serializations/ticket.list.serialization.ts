import { Type } from 'class-transformer';

export class TicketListSerialization {
  @Type(() => String)
  id: string;

  @Type(() => String)
  title: string;

  @Type(() => String)
  description: string;

  @Type(() => Number)
  points: number;

  @Type(() => String)
  status: string;

  @Type(() => Date)
  dueDate: Date;
}

export class TicketListDataSerialization {
  @Type(() => TicketListSerialization)
  data: TicketListSerialization[];
}
