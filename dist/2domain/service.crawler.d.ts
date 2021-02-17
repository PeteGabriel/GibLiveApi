import { Departure } from './model/departure';
import WebGatewayImpl from './../3infra/impl/web_gateway_impl';
import { DailyEvent } from './model/daily_event';
import { Arrival } from './../2domain/model/arrival';
import { Event } from './model/event';
export declare class Crawler {
    private readonly g;
    private readonly gate;
    constructor(g: WebGatewayImpl);
    private loadFlightDateHtmlInfo;
    getArrivalsInfo(): Promise<Array<DailyEvent<Arrival>>>;
    getDeparturesInfo(): Promise<Array<DailyEvent<Departure>>>;
    getNextFlight(arrivals: Array<DailyEvent<Arrival>>, departures: Array<DailyEvent<Departure>>): Promise<Event>;
    private extractDataFromNodes;
    private extractAirplaneCia;
    private getArrivalsByDate;
    private getDeparturesByDate;
}
