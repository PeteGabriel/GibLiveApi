import { Module } from '@nestjs/common';
import { AppController } from './presentation/app.controller';
import { AppService } from './domain/app.service';
import { Crawler } from './domain/service.crawler';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Crawler],
})
export class AppModule {}
