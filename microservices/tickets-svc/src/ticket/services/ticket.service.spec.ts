import { Test, TestingModule } from '@nestjs/testing';
import { RpcException } from '@nestjs/microservices';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of tickets and the object properties should match', async () => {
    const tickets = await service.list();
    expect(tickets).toBeDefined();
    expect(tickets[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      creator: expect.any(String),
      status: expect.any(String),
      dueDate: expect.any(String),
    });
  });

  it('should return a single ticket by id and the object properties should match', async () => {
    const tickets = await service.list();
    const ticket = await service.get(tickets[0].id);
    expect(ticket).toBeDefined();
    expect(ticket).toEqual({
      id: expect.any(String),
      creator: expect.any(String),
      assignees: expect.any(Array),
      title: expect.any(String),
      description: expect.any(String),
      status: expect.any(String),
      points: expect.any(Number),
      dueDate: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should throw a RpcException when a ticket is not found', () => {
    expect(() => service.get('999')).toThrow(RpcException);
  });

  it('should return an object with a summary property', async () => {
    const summary = await service.summary();
    expect(summary).toBeDefined();
    expect(summary).toEqual({
      todo: {
        totalTasks: expect.any(Number),
        totalPoints: expect.any(Number),
      },
      inProgress: {
        totalTasks: expect.any(Number),
        totalPoints: expect.any(Number),
      },
      inReview: {
        totalTasks: expect.any(Number),
        totalPoints: expect.any(Number),
      },
      done: {
        totalTasks: expect.any(Number),
        totalPoints: expect.any(Number),
      },
    });
  });

  it('should return an object with a performance property', async () => {
    const performance = await service.performance();
    expect(performance).toBeDefined();
    expect(performance).toEqual({
      completedTasks: expect.any(Number),
      unCompletedTasks: expect.any(Number),
      totalTasks: expect.any(Number),
      completedTasksPercentage: expect.any(String),
      completedPoints: expect.any(Number),
      unCompletedPoints: expect.any(Number),
      totalPoints: expect.any(Number),
      completedPointsPercentage: expect.any(String),
    });
  });

  it('should create a new ticket and return the ticket object', async () => {
    const ticket = await service.create({
      title: 'test',
      description: 'test',
      points: 3,
      dueDate: '2021-01-01',
    });
    expect(ticket).toBeDefined();
    expect(ticket).toEqual({
      id: expect.any(String),
      creator: 'test',
      assignees: [],
      histories: expect.any(Array),
      title: 'test',
      description: 'test',
      status: 'TODO',
      points: 3,
      dueDate: '2021-01-01',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    await service.delete(ticket.id);
  });

  it('should update a ticket and return the updated ticket object', async () => {
    const ticket = await service.update('1', {
      title: 'test',
      description: 'test',
      dueDate: '2021-01-01',
      points: 3,
    });
    expect(ticket).toBeDefined();
    expect(ticket).toEqual({
      id: '1',
      creator: expect.any(String),
      assignees: expect.any(Array),
      histories: expect.any(Array),
      title: 'test',
      description: 'test',
      status: expect.any(String),
      dueDate: '2021-01-01',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('should throw a RpcException when deleting a ticket is not found', () => {
    expect(() => service.delete('999')).toThrow(RpcException);
  });
});
