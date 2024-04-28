import { TicketAddRemoveAssigneeDto } from 'src/ticket/dtos/ticket.add-remove-assignee.dto';
import { TicketChangeAssigneeDto } from 'src/ticket/dtos/ticket.change-assignee.dto';
import { TicketCreateDto } from 'src/ticket/dtos/ticket.create.dto';
import { TicketUpdateDto } from 'src/ticket/dtos/ticket.update.dto';
import { TicketGetSerialization } from 'src/ticket/serializations/ticket.get.serialization';
import {
  TicketListDataSerialization,
  TicketListSerialization,
} from 'src/ticket/serializations/ticket.list.serialization';
import { TicketPerformanceSerialization } from 'src/ticket/serializations/ticket.performance.serialization';
import { TicketSummarySerialization } from 'src/ticket/serializations/ticket.summary.serialization';

export interface ITicketService {
  create(data: TicketCreateDto): Promise<TicketListSerialization>;
  get({ id }: { id: string }): Promise<TicketGetSerialization>;
  list(): Promise<TicketListDataSerialization>;
  listByUser({
    userId,
  }: {
    userId: string;
  }): Promise<TicketListDataSerialization>;
  summary({ userId }: { userId: string }): Promise<TicketSummarySerialization>;
  performance({
    userId,
  }: {
    userId: string;
  }): Promise<TicketPerformanceSerialization>;
  update(data: TicketUpdateDto): Promise<TicketListSerialization>;
  addAssignee(
    data: TicketAddRemoveAssigneeDto,
  ): Promise<TicketGetSerialization>;
  changeAssignee(
    data: TicketChangeAssigneeDto,
  ): Promise<TicketGetSerialization>;
  removeAssignee(
    data: TicketAddRemoveAssigneeDto,
  ): Promise<TicketGetSerialization>;
  delete({ id }: { id: string }): Promise<TicketListSerialization>;
}
