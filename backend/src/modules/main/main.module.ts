import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppModule } from '../app/app.module';
import { AuthModule } from '../auth/auth.module';
import { MainController } from './main.controller';

// const reactAppPath = join(__dirname, '../../../../frontend/build');
const reactAppPath = join(__dirname, '..', '..', 'static/build');
const path = join(__dirname, '..', '..', 'static');

@Module({
  imports: [
    AppModule,
    AuthModule,
    ServeStaticModule.forRoot(
      {
        rootPath: reactAppPath,
        renderPath: '/app*',
      },
      {
        rootPath: path,
        exclude: ['/app*', '/auth*'],
      },
    ),
  ],
  controllers: [MainController],
  providers: [],
})
export class MainModule {}
