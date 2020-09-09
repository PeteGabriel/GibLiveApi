import { Event } from "./event";
export declare class Arrival extends Event {
    code: string;
    operator: string;
    time: string;
    status: string;
    from: string;
    constructor(params: any);
}
