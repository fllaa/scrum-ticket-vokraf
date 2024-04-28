import { Injectable } from '@nestjs/common';
import { AuthService } from '../../common/auth/auth.service';
import { DatabaseService } from '../../common/database/database.service';

import type { IUserAuthService } from 'src/user/interfaces/user.auth.service.interface';
import type { UserLoginDto } from 'src/user/dtos/user.login.dto';
import type { UserRegisterDto } from 'src/user/dtos/user.register.dto';

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
  ) {}

  async login(data: UserLoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return null;
    }

    const isValid = await this.authService.validateUser(
      data.password,
      user.password,
    );

    if (!isValid) {
      return null;
    }

    return {
      accessToken: await this.authService.createToken({
        sub: user.id,
        email: user.email,
        name: user.name,
      }),
    };
  }

  async register(data: UserRegisterDto) {
    const password = await this.authService.createPassword(data.password);

    const user = await this.databaseService.user.create({
      data: {
        email: data.email,
        password: password.passwordHash,
        name: data.name,
        avatar: data.avatar,
      },
    });

    return {
      accessToken: await this.authService.createToken({
        sub: user.id,
        email: user.email,
        name: user.name,
      }),
    };
  }
}
