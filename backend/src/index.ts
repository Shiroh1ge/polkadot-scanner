import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { join } from 'path';
import { MainModule } from './modules/main/main.module';

const expressServer = express();

const setupViewsDir = (app: NestExpressApplication) => {
  app.setBaseViewsDir(join(__dirname, 'static'));
  app.setViewEngine('ejs');
};

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, new ExpressAdapter(expressInstance), {
    cors: { origin: true },
  });
  setupViewsDir(app);
  await app.init();
};

export const api = functions.region('europe-west1').https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
