/// <reference types="cheerio" />
import { Cache } from '../cache/cache';
import { WebGateway } from '../interfaces/web_gateway';
export default class WebGatewayImpl implements WebGateway {
    private readonly c;
    private $;
    private cache;
    constructor(c: Cache);
    setup(): Promise<void>;
    load(classId: string): Promise<Cheerio>;
}
