import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Match } from 'src/common/validation/validation.match.decorator';
import { UserCreateDto } from 'src/user/dtos/user.create.dto';

export class RegisterDto extends UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Match('password')
  @Type(() => String)
  readonly confirmPassword: string;
}
