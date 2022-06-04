import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { MainModule } from './modules/main/main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.setBaseViewsDir(join(__dirname, 'prompt'));
  app.setViewEngine('ejs');
  await app.listen(3001);
}
bootstrap();
