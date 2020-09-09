import { Event } from "./event";
export declare class Departure extends Event {
    code: string;
    operator: string;
    time: string;
    status: string;
    to: string;
    constructor(params: any);
}
