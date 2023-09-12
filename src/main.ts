import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap(
  app: INestApplication,
  config: ConfigService<unknown, boolean>,
) {
  await app.listen(config.get<number>('PORT'), () => {
    console.info(`Server running on ${config.get<number>('PORT')} 🚀`);
  });
}
const createFork = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  bootstrap(app, config);
};

createFork();
