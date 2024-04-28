import type { JwtModuleOptions } from '@nestjs/jwt';
import { AUTH_JWT_EXPIRES_IN, AUTH_JWT_SECRET } from './auth.constant';

export const authJwtOptions: JwtModuleOptions = {
  global: true,
  secret: AUTH_JWT_SECRET,
  signOptions: {
    expiresIn: AUTH_JWT_EXPIRES_IN,
  },
};
