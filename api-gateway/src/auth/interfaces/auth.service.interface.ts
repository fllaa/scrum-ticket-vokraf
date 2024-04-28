import { LoginDto } from 'src/auth/dtos/login.dto';
import { UserCreateDto } from 'src/user/dtos/user.create.dto';
import { AuthSerialization } from 'src/auth/serializations/auth.serialization';

export interface IAuthService {
  login(data: LoginDto): Promise<AuthSerialization>;
  register(data: UserCreateDto): Promise<AuthSerialization>;
}
