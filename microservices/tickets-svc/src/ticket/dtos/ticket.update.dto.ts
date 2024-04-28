import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TicketUpdateDto {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;

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
  @IsOptional()
  @Type(() => String)
  readonly status?: string;

  @IsDateString()
  @IsOptional()
  @Type(() => String)
  readonly dueDate?: string;
}
