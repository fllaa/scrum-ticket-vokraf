import { Type } from 'class-transformer';

export class AuthSerialization {
  @Type(() => String)
  accessToken: string;
}
