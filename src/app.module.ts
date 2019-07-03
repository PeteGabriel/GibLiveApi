import { Module } from '@nestjs/common';
import { AppController } from './1presentation/app.controller';
import { AppService } from './2domain/app.service';
import { Crawler } from './2domain/service.crawler';
import { Cache } from './3infra/cache/cache';
import WebGatewayImpl from './3infra/impl/web_gateway_impl';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Crawler, Cache, WebGatewayImpl],
})
export class AppModule {}
