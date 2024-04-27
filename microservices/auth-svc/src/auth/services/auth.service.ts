// TODO: Implement the AuthService class
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';

import { IAuthService } from 'src/auth/interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  async login(data: any): Promise<any> {
    return null;
  }

  async register(data: any): Promise<any> {
    return null;
  }
}
