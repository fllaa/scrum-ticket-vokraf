import { Exclude, Type } from 'class-transformer';

export class UserGetSerialization {
  @Type(() => String)
  id: string;

  @Type(() => String)
  email: string;

  @Type(() => String)
  name: string;

  @Type(() => String)
  avatar: string;

  @Exclude()
  password: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;
}
