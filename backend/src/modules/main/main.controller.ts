import { Controller, Get, Render } from '@nestjs/common';

@Controller('')
export class MainController {
  @Get()
  @Render('index.ejs')
  get(): void {}
}
