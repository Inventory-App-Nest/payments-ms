import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RawBody, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Payments');

  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(envs.port);

  logger.log(`Payments running on port: ${envs.port}`);
}
bootstrap();
