import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TicketUpdateApiDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly title?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly points?: number;

  @IsString()
  @IsEnum(['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'])
  @IsOptional()
  @Type(() => String)
  readonly status?: string;

  @IsDateString()
  @IsOptional()
  @Type(() => String)
  readonly dueDate?: string;
}

export class TicketUpdateDto extends TicketUpdateApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;
}
