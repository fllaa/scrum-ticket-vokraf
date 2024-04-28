import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Type(() => String)
  readonly name: string;

  @IsUrl()
  @IsOptional()
  @Type(() => String)
  readonly avatar?: string;
}
