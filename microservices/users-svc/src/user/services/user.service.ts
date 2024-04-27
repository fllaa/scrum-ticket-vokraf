// TODO: Implement the UserService class
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';

import { IUserService } from 'src/user/interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  async create(data: any): Promise<any> {
    return null;
  }

  async get(id: string): Promise<any> {
    return null;
  }

  async delete(id: string): Promise<any> {
    return null;
  }
}
