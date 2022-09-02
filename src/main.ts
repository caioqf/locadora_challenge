import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT, () => {
    console.log(`[INFO] API LISTENING ON PORT ${process.env.API_PORT}`);
  });
}
bootstrap();
