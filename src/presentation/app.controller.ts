import { Controller, Get, HttpCode, Header } from '@nestjs/common';
import { AppService } from '../domain/app.service';
import { Crawler } from '../domain/service.crawler';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cService: Crawler
    ) {}

  @Get('/departures')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async departures(): Promise<string> {
    return JSON.stringify(await this.cService.getDeparturesInfo())
  }

  @Get('alive')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  alive(): string {
    return this.appService.alive();
  }
}
