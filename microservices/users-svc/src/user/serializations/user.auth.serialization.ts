import { Type } from 'class-transformer';

export class UserAuthSerialization {
  @Type(() => String)
  accessToken: string;
}
