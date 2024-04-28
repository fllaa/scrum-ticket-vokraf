import { join } from 'path';

import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${URL}:${PORT}`,
      package: 'user',
      protoPath: join(__dirname, './_proto/user.proto'),
      loader: {
        objects: true,
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen();

  console.log(`🤼 Users Service running on port ${PORT}`);
}
bootstrap();
