import { AppService } from '../2domain/app.service';
import { Crawler } from '../2domain/service.crawler';
export declare class AppController {
    private readonly appService;
    private readonly cService;
    constructor(appService: AppService, cService: Crawler);
    departures(): Promise<string>;
    arrivals(): Promise<string>;
    alive(): string;
}
