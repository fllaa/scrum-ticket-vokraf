import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TicketChangeAssigneeApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly oldAssigneeId: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly newAssigneeId: string;
}

export class TicketChangeAssigneeDto extends TicketChangeAssigneeApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;
}
