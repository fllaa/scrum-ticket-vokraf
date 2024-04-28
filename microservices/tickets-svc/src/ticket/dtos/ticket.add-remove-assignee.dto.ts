import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class TicketAddRemoveAssigneeDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly assigneeId: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;
}
