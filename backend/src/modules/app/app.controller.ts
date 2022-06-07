import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { Response } from 'express';

@Controller('app')
export class AppController {
  @UseGuards(AuthGuard)
  @Get()
  get(@Res() response: Response): void {
    return response.sendFile('index.html', { root: './src/static/build' });
  }
}
