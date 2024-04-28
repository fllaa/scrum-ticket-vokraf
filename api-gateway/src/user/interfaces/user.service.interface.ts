import { UserCreateDto } from 'src/user/dtos/user.create.dto';
import { UserGetSerialization } from 'src/user/serializations/user.get.serialization';

export interface UserService {
  create(data: UserCreateDto): Promise<UserGetSerialization>;
  get({ id }: { id: string }): Promise<UserGetSerialization>;
  delete({ id }: { id: string }): Promise<UserGetSerialization>;
}
