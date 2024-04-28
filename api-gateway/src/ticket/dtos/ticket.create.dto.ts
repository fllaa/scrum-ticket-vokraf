import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TicketCreateApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly title: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly points: number;

  @IsDateString()
  @IsOptional()
  @Type(() => String)
  readonly dueDate?: string;
}

export class TicketCreateDto extends TicketCreateApiDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly creatorId: string;
}
