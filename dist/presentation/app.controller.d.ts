import { AppService } from '../domain/app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    alive(): string;
}
