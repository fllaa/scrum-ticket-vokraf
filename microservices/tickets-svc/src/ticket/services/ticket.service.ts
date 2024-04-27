// TODO: Implement the TicketService class
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

import type { ITicketService } from 'src/ticket/interfaces/ticket.service.interface';

@Injectable()
export class TicketService implements ITicketService {
  async create(data: any): Promise<any> {
    return null;
  }

  async get(id: string): Promise<any> {
    return null;
  }

  async list(): Promise<any> {
    return null;
  }

  async summary(): Promise<any> {
    return null;
  }

  async performance(): Promise<any> {
    return null;
  }

  async update(id: string, data: any): Promise<any> {
    return null;
  }

  async delete(id: string): Promise<any> {
    return null;
  }
}
