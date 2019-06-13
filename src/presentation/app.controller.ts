import { Controller, Get, HttpCode, Header } from '@nestjs/common';
import { AppService } from '../domain/app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  


  @Get('alive')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  alive(): string {

    return this.appService.alive();
  }
}
