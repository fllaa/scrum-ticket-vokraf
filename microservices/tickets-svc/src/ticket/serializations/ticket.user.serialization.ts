import { Expose, Type } from 'class-transformer';

export class TicketUserSerialization {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  avatar: string;
}
