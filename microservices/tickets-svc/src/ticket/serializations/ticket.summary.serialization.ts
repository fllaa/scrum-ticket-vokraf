import { Type } from 'class-transformer';

class TotalTasksAndPoints {
  @Type(() => Number)
  totalTasks: number;

  @Type(() => Number)
  totalPoints: number;
}

export class TicketSummarySerialization {
  @Type(() => TotalTasksAndPoints)
  total: TotalTasksAndPoints;

  @Type(() => TotalTasksAndPoints)
  todo: TotalTasksAndPoints;

  @Type(() => TotalTasksAndPoints)
  inProgress: TotalTasksAndPoints;

  @Type(() => TotalTasksAndPoints)
  inReview: TotalTasksAndPoints;

  @Type(() => TotalTasksAndPoints)
  done: TotalTasksAndPoints;
}
