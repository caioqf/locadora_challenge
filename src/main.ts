import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json({ limit: '12mb' }));
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.API_PORT, () => {
    console.log(`[INFO] API LISTENING ON PORT ${process.env.API_PORT}`);
  });
}
bootstrap();
