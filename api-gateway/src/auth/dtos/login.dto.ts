import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly password: string;
}
