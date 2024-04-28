import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TicketChangeAssigneeDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly oldAssigneeId: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly newAssigneeId: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;
}
