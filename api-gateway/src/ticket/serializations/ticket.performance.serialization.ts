import { Type } from 'class-transformer';

export class TicketPerformanceSerialization {
  @Type(() => Number)
  completedTasks: number;

  @Type(() => Number)
  unCompletedTasks: number;

  @Type(() => Number)
  totalTasks: number;

  @Type(() => String)
  completedTasksPercentage: string;

  @Type(() => Number)
  completedPoints: number;

  @Type(() => Number)
  unCompletedPoints: number;

  @Type(() => Number)
  totalPoints: number;

  @Type(() => String)
  completedPointsPercentage: string;
}
