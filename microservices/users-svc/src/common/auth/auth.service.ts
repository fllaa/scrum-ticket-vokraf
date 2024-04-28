import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthCreateToken, IAuthPassword } from './auth.interface';
import { UtilsHash } from '../utils/utils.hash';
import { AUTH_PASSWORD_SALT_LENGTH } from './auth.constant';

@Injectable()
export class AuthService {
  private readonly passwordSaltLength = AUTH_PASSWORD_SALT_LENGTH;

  constructor(private readonly jwtService: JwtService) {}

  async createSalt(length: number): Promise<string> {
    return UtilsHash.randomSalt(length);
  }

  async createPassword(password: string): Promise<IAuthPassword> {
    const salt: string = await this.createSalt(this.passwordSaltLength);

    const passwordHash = UtilsHash.bcrypt(password, salt);
    return {
      passwordHash,
      salt,
    };
  }

  async validateUser(
    passwordString: string,
    passwordHash: string,
  ): Promise<boolean> {
    return UtilsHash.bcryptCompare(passwordString, passwordHash);
  }

  async createToken(payload: IAuthCreateToken): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
