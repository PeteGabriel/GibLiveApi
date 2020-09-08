import { Departure } from './model/departure';
import WebGatewayImpl from './../3infra/impl/web_gateway_impl';
import { DailyEvent } from './model/daily_event';
import { Arrival } from './../2domain/model/arrival';
export declare class Crawler {
    private readonly g;
    private readonly gate;
    constructor(g: WebGatewayImpl);
    private loadFlightDateHtmlInfo;
    getArrivalsInfo(): Promise<Array<DailyEvent<Arrival>>>;
    getDeparturesInfo(): Promise<Array<DailyEvent<Departure>>>;
    getNextFlightInfo(): Promise<DailyEvent<any>>;
    private extractDataFromNodes;
    private extractFlightsByDate;
    private loadFlightsData;
}
