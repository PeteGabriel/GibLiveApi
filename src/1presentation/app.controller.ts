import { Controller, Get, HttpCode, Header, Req, Request, Res, HttpStatus } from '@nestjs/common';
import { AppService } from '../2domain/app.service';
import { Crawler } from '../2domain/service.crawler';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cService: Crawler,
    ) {}

  @Get('/')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async root(@Req() request: Request): Promise<string> {
    const root = {
      departures: {
        method: 'GET',
        url: request.url + 'departures',
      },
      arrivals: {
        method: 'GET',
        url: request.url + 'arrivals',
      },
      nextFlight: {
        method: 'GET',
        url: request.url + 'next-flight'
      }
    }
    return JSON.stringify(root)
  }

  @Get('/departures')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async departures(): Promise<string> {
    
    return JSON.stringify(await this.cService.getDeparturesInfo())
    
  }

  @Get('/arrivals')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async arrivals(): Promise<string> {
    return JSON.stringify(await this.cService.getArrivalsInfo())
  }

  @Get('alive')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  alive(): string {
    return this.appService.alive();
  }

  @Get('/next-flight')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async next(): Promise<string> {
    return JSON.stringify(await this.cService.getNextFlightInfo())
  }
}
