import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('app')
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get()
  get(): string {
    return;
  }
}
