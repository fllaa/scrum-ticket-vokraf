import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../common/database/database.service';

import type { UserCreateDto } from 'src/user/dtos/user.create.dto';
import type { IUserService } from 'src/user/interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: UserCreateDto) {
    const user = await this.databaseService.user.create({
      data,
    });
    return user;
  }

  async get(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async delete(id: string) {
    try {
      const user = await this.databaseService.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return null;
        }
      }
    }
  }
}
