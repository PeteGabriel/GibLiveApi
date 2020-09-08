export declare class Arrival {
    code: string;
    operator: string;
    time: string;
    status: string;
    from: string;
    constructor(params: any);
    private formatTime;
    private parseHours;
    private parseMinutes;
}
