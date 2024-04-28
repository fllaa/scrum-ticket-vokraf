import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';
import { TicketCreateDto } from '../dtos/ticket.create.dto';
import { UtilsFormat } from 'src/common/utils/utils.format';
import { TICKET_STATUS_ENUM } from 'src/ticket/constants/ticket.status.enum.constant';
import { TICKET_HISTORY_ACTION_ENUM } from 'src/ticket/constants/ticket.history.enum.constant';
import {
  TICKET_HISTORY_ACTION_TEXT,
  TICKET_HISTORY_PROPERTY_ACTION,
} from 'src/ticket/constants/ticket.history.constant';

import type { ITicketService } from '../interfaces/ticket.service.interface';
import { TicketUpdateDto } from 'src/ticket/dtos/ticket.update.dto';
import { UtilsObject } from 'src/common/utils/utils.object';

@Injectable()
export class TicketService implements ITicketService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: TicketCreateDto) {
    const creator = await this._getUser(data.creatorId);

    const ticket = await this.databaseService.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        points: data.points,
        status: TICKET_STATUS_ENUM.TODO,
        dueDate: data.dueDate,
        creatorId: data.creatorId,
        histories: {
          create: [
            this._generateHistoryData(
              data.creatorId,
              TICKET_HISTORY_ACTION_ENUM.CREATE,
              [creator.name],
            ),
          ],
        },
      },
    });

    return ticket;
  }

  async get(id: string) {
    const ticket = await this.databaseService.ticket.findUnique({
      where: { id },
      include: {
        creator: true,
        assignees: { select: { assignee: true } },
        histories: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return {
      ...ticket,
      assignees: ticket.assignees.map((d) => ({ ...d.assignee })),
    };
  }

  async list() {
    const tickets = await this.databaseService.ticket.findMany();

    return tickets;
  }

  async listByUser(userId: string) {
    const tickets = await this.databaseService.ticket.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      include: {
        creator: { select: { id: true, name: true } },
      },
    });

    return tickets;
  }

  async summary(userId: string) {
    const total = await this.databaseService.ticket.aggregate({
      where: { assignees: { some: { assigneeId: userId } } },
      _count: true,
      _sum: {
        points: true,
      },
    });

    const todo = await this.databaseService.ticket.aggregate({
      where: {
        AND: [
          { status: TICKET_STATUS_ENUM.TODO },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      _count: true,
      _sum: {
        points: true,
      },
    });

    const inProgress = await this.databaseService.ticket.aggregate({
      where: {
        AND: [
          { status: TICKET_STATUS_ENUM.IN_PROGRESS },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      _count: true,
      _sum: {
        points: true,
      },
    });

    const inReview = await this.databaseService.ticket.aggregate({
      where: {
        AND: [
          { status: TICKET_STATUS_ENUM.IN_REVIEW },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      _count: true,
      _sum: {
        points: true,
      },
    });

    const done = await this.databaseService.ticket.aggregate({
      where: {
        AND: [
          { status: TICKET_STATUS_ENUM.DONE },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      _count: true,
      _sum: {
        points: true,
      },
    });

    return {
      total: {
        totalTasks: total._count,
        totalPoints: total._sum.points,
      },
      todo: {
        totalTasks: todo._count,
        totalPoints: todo._sum.points,
      },
      inProgress: {
        totalTasks: inProgress._count,
        totalPoints: inProgress._sum.points,
      },
      inReview: {
        totalTasks: inReview._count,
        totalPoints: inReview._sum.points,
      },
      done: {
        totalTasks: done._count,
        totalPoints: done._sum.points,
      },
    };
  }

  async performance(userId: string) {
    const completedTasks = await this.databaseService.ticket.count({
      where: {
        AND: [
          { status: TICKET_STATUS_ENUM.DONE },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
    });

    const unCompletedTasks = await this.databaseService.ticket.count({
      where: {
        AND: [
          { status: { not: TICKET_STATUS_ENUM.DONE } },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
    });

    const totalTasks = await this.databaseService.ticket.count({
      where: { assignees: { some: { assigneeId: userId } } },
    });

    const completedTasksPercentage =
      ((completedTasks / (totalTasks || 1)) * 100).toFixed(2) + '%';

    const completedPoints = await this.databaseService.ticket.aggregate({
      where: {
        AND: [
          { status: TICKET_STATUS_ENUM.DONE },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      _sum: { points: true },
    });

    const unCompletedPoints = await this.databaseService.ticket.aggregate({
      where: {
        AND: [
          { status: { not: TICKET_STATUS_ENUM.DONE } },
          { assignees: { some: { assigneeId: userId } } },
        ],
      },
      _sum: { points: true },
    });

    const totalPoints = await this.databaseService.ticket.aggregate({
      where: { assignees: { some: { assigneeId: userId } } },
      _sum: { points: true },
    });

    const completedPointsPercentage =
      (
        (completedPoints._sum.points / (totalPoints._sum.points || 1)) *
        100
      ).toFixed(2) + '%';

    const result = {
      completedTasks,
      unCompletedTasks,
      totalTasks,
      completedTasksPercentage,
      completedPoints: completedPoints._sum.points ?? 0,
      unCompletedPoints: unCompletedPoints._sum.points ?? 0,
      totalPoints: totalPoints._sum.points ?? 0,
      completedPointsPercentage,
    };

    return result;
  }

  async update(data: TicketUpdateDto) {
    const user = await this._getUser(data.userId);

    const oldTicket = await this.databaseService.ticket.findUnique({
      where: { id: data.id },
    });

    const ticket = await this.databaseService.ticket.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        points: data.points,
        status: data.status as TICKET_STATUS_ENUM,
        dueDate: data.dueDate,
      },
    });

    const updatedProperties = UtilsObject.findPropertyDifferences(
      oldTicket,
      ticket,
    );

    const histories = Object.entries(updatedProperties)
      .filter(([key]) => !['createdAt', 'updatedAt'].includes(key))
      .filter(([key, value]) =>
        key === 'dueDate'
          ? new Date(value[0]).toISOString() !==
            new Date(value[1]).toISOString()
          : true,
      )
      .map(([key, value]) => {
        const hasTwoValues = ['points', 'dueDate'].includes(key);

        return this._generateHistoryData(
          data.userId,
          TICKET_HISTORY_PROPERTY_ACTION[key],
          hasTwoValues
            ? [user.name, value[1]]
            : [user.name, value[0], value[1]],
        );
      });

    await this.databaseService.ticket.update({
      where: { id: data.id },
      data: {
        histories: {
          create: histories,
        },
      },
    });

    return ticket;
  }

  async addAssignee(
    id: string,
    assigneeId: string,
    userId: string,
  ): Promise<any> {
    const user = await this._getUser(userId);

    const ticket = await this.databaseService.ticket.findUnique({
      where: { id },
      include: {
        assignees: {
          select: { assignee: true, assigneeId: true },
        },
      },
    });

    const assignee = await this._getUser(assigneeId);

    const assignees = ticket.assignees.map((assignee) => assignee.assigneeId);

    if (assignees.includes(assigneeId)) {
      return {
        ...ticket,
        assignees: [...ticket.assignees.map((d) => ({ ...d.assignee }))],
      };
    }

    await this.databaseService.ticket.update({
      where: { id },
      data: {
        assignees: {
          create: {
            assigneeId,
          },
        },
        histories: {
          create: [
            this._generateHistoryData(
              userId,
              TICKET_HISTORY_ACTION_ENUM.ADD_ASSIGNEE,
              [user.name, assignee.name],
            ),
          ],
        },
      },
    });

    return {
      ...ticket,
      assignees: [...ticket.assignees.map((d) => ({ ...d.assignee }))],
    };
  }

  async changeAssignee(
    id: string,
    oldAssigneeId: string,
    newAssigneeId: string,
    userId: string,
  ): Promise<any> {
    const user = await this._getUser(userId);

    const ticket = await this.databaseService.ticket.findUnique({
      where: { id },
      include: {
        assignees: {
          select: { assignee: true, assigneeId: true },
        },
      },
    });

    const oldAssignee = await this._getUser(oldAssigneeId);
    const newAssignee = await this._getUser(newAssigneeId);

    const assignees = ticket.assignees.map((assignee) => assignee.assigneeId);

    if (!assignees.includes(oldAssigneeId)) {
      return ticket;
    }

    await this.databaseService.ticket.update({
      where: { id },
      data: {
        assignees: {
          delete: {
            assigneeId_ticketId: { assigneeId: oldAssigneeId, ticketId: id },
          },
          create: { assigneeId: newAssigneeId },
        },
        histories: {
          create: [
            this._generateHistoryData(
              userId,
              TICKET_HISTORY_ACTION_ENUM.CHANGE_ASSIGNEE,
              [user.name, oldAssignee.name, newAssignee.name],
            ),
          ],
        },
      },
    });

    return {
      ...ticket,
      assignees: [...ticket.assignees.map((d) => ({ ...d.assignee }))],
    };
  }

  async removeAssignee(
    id: string,
    assigneeId: string,
    userId: string,
  ): Promise<any> {
    const user = await this._getUser(userId);

    const ticket = await this.databaseService.ticket.findUnique({
      where: { id },
      include: {
        assignees: {
          select: { assignee: true, assigneeId: true },
        },
      },
    });

    const assignee = await this._getUser(assigneeId);

    const assignees = ticket.assignees.map((assignee) => assignee.assigneeId);

    if (!assignees.includes(assigneeId)) {
      return {
        ...ticket,
        assignees: [...ticket.assignees.map((d) => ({ ...d.assignee }))],
      };
    }

    await this.databaseService.ticket.update({
      where: { id },
      data: {
        assignees: {
          delete: {
            assigneeId_ticketId: { assigneeId, ticketId: id },
          },
        },
        histories: {
          create: [
            this._generateHistoryData(
              userId,
              TICKET_HISTORY_ACTION_ENUM.REMOVE_ASSIGNEE,
              [user.name, assignee.name],
            ),
          ],
        },
      },
    });

    return {
      ...ticket,
      assignees: [...ticket.assignees.map((d) => ({ ...d.assignee }))],
    };
  }

  async delete(id: string) {
    const ticket = await this.databaseService.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return null;
    }

    await this.databaseService.ticket.delete({
      where: {
        id,
      },
    });

    return ticket;
  }

  async _getUser(userId: string) {
    return this.databaseService.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });
  }

  _generateHistoryData(
    userId: string,
    action: TICKET_HISTORY_ACTION_ENUM,
    data?: string[],
  ) {
    let text = TICKET_HISTORY_ACTION_TEXT[action];
    text = UtilsFormat.templateText(text, data);

    return {
      title: text,
      userId,
    };
  }
}
