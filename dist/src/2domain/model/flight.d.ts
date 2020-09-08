import { Arrival } from './arrival';
import { Departure } from './departure';
export declare class Flight {
    date: string;
    arrivals: [Arrival];
    departures: [Departure];
    constructor(props: any);
}
