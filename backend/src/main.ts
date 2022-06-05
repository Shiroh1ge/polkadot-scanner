import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from 'dotenv';
import { MainModule } from './modules/main/main.module';

config({
  override: true,
});

// setup needed for rendering ejs files
const setupViewsDir = (app: NestExpressApplication) => {
  app.setBaseViewsDir(join(__dirname, 'static'));
  app.setViewEngine('ejs');
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  setupViewsDir(app);

  await app.listen(process.env.PORT, () => {
    console.info('Application is running on port: ', process.env.PORT);
  });
}
bootstrap();
