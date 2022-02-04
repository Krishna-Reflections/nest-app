import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('public')
@Controller('/public')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }
}
