import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TicketService } from 'src/ticket/services/ticket.service';
import {
  TicketListDataSerialization,
  TicketListSerialization,
} from 'src/ticket/serializations/ticket.list.serialization';
import type { TicketCreateDto } from 'src/ticket/dtos/ticket.create.dto';
import { Prisma } from '@prisma/client';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
  GrpcUnknownException,
} from '@flla/nestjs-grpc-exceptions';
import { TicketSummarySerialization } from 'src/ticket/serializations/ticket.summary.serialization';
import { TicketPerformanceSerialization } from 'src/ticket/serializations/ticket.performance.serialization';
import { TicketUpdateDto } from 'src/ticket/dtos/ticket.update.dto';
import { TicketAddRemoveAssigneeDto } from 'src/ticket/dtos/ticket.add-remove-assignee.dto';
import { TicketChangeAssigneeDto } from 'src/ticket/dtos/ticket.change-assignee.dto';
import { TicketGetSerialization } from 'src/ticket/serializations/ticket.get.serialization';

@Controller()
export class TicketController {
  constructor(
    @Inject(TicketService) private readonly ticketService: TicketService,
  ) {}

  @GrpcMethod('TicketService', 'Create')
  async create(data: TicketCreateDto): Promise<TicketListSerialization> {
    try {
      const ticket = await this.ticketService.create(data);
      return ticket;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new GrpcAlreadyExistsException('Ticket already exists');
        }
      }

      throw new GrpcUnknownException('Unknown error');
    }
  }

  @GrpcMethod('TicketService', 'Get')
  async get({ id }: { id: string }): Promise<TicketListSerialization> {
    const ticket = await this.ticketService.get(id);

    if (!ticket) {
      throw new GrpcNotFoundException('Ticket not found');
    }

    return ticket;
  }

  @GrpcMethod('TicketService', 'List')
  async list(): Promise<TicketListDataSerialization> {
    return {
      data: await this.ticketService.list(),
    };
  }

  @GrpcMethod('TicketService', 'ListByUser')
  async listByUser({
    userId,
  }: {
    userId: string;
  }): Promise<TicketListDataSerialization> {
    return {
      data: await this.ticketService.listByUser(userId),
    };
  }

  @GrpcMethod('TicketService', 'Summary')
  async summary({
    userId,
  }: {
    userId: string;
  }): Promise<TicketSummarySerialization> {
    return this.ticketService.summary(userId);
  }

  @GrpcMethod('TicketService', 'Performance')
  async performance({
    userId,
  }: {
    userId: string;
  }): Promise<TicketPerformanceSerialization> {
    return this.ticketService.performance(userId);
  }

  @GrpcMethod('TicketService', 'Update')
  async update(data: TicketUpdateDto): Promise<TicketListSerialization> {
    try {
      const ticket = await this.ticketService.update(data);
      return ticket;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new GrpcAlreadyExistsException('Ticket already exists');
        }
      }

      throw new GrpcUnknownException('Unknown error');
    }
  }

  @GrpcMethod('TicketService', 'AddAssignee')
  async addAssignee(
    data: TicketAddRemoveAssigneeDto,
  ): Promise<TicketGetSerialization> {
    const ticket = await this.ticketService.addAssignee(
      data.id,
      data.assigneeId,
      data.userId,
    );

    return ticket;
  }

  @GrpcMethod('TicketService', 'ChangeAssignee')
  async changeAssignee(
    data: TicketChangeAssigneeDto,
  ): Promise<TicketGetSerialization> {
    const ticket = await this.ticketService.changeAssignee(
      data.id,
      data.oldAssigneeId,
      data.newAssigneeId,
      data.userId,
    );
    return ticket;
  }

  @GrpcMethod('TicketService', 'RemoveAssignee')
  async removeAssignee(
    data: TicketAddRemoveAssigneeDto,
  ): Promise<TicketGetSerialization> {
    const ticket = await this.ticketService.removeAssignee(
      data.id,
      data.assigneeId,
      data.userId,
    );
    return ticket;
  }

  @GrpcMethod('TicketService', 'Delete')
  async delete({ id }: { id: string }): Promise<TicketListSerialization> {
    const ticket = await this.ticketService.delete(id);

    if (!ticket) {
      throw new GrpcNotFoundException('Ticket not found');
    }

    return ticket;
  }
}
