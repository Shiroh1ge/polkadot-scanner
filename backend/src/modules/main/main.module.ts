import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppModule } from '../app/app.module';
import { AuthModule } from '../auth/auth.module';

// const reactAppPath = join(__dirname, '..', '..', '..', '..', 'frontend/build');
const path = join(__dirname, '..', '..', 'prompt');

@Module({
  imports: [
    AppModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: path,
      exclude: ['/app*', '/auth*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
