import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.NODE_ENV || 'development',

  microservices: {
    users: {
      url: process.env.USER_SERVICE_URL || 'localhost:3101',
    },
  },
}));
