import { Comparator } from "../interfaces/comparator";
import { Arrival } from "../model/arrival";
import { Departure } from "../model/departure";
export declare class EventComparator implements Comparator<Arrival, Departure> {
    compare(a: Arrival, d: Departure): number;
}
