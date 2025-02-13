import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import * as dotenv from 'dotenv';

dotenv.config();

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
