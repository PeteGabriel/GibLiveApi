import { AppService } from '../2domain/app.service';
import { Crawler } from '../2domain/service.crawler';
export declare class AppController {
    private readonly appService;
    private readonly cService;
    static DEPARTURE: string;
    static ARRIVAL: string;
    constructor(appService: AppService, cService: Crawler);
    root(request: Request): Promise<string>;
    departures(request: Request): Promise<string>;
    arrivals(request: Request): Promise<string>;
    alive(): string;
    next(request: Request): Promise<string>;
}
