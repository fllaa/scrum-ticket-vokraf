import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TicketAddRemoveAssigneeApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly assigneeId: string;
}

export class TicketAddRemoveAssigneeDto extends TicketAddRemoveAssigneeApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;
}
