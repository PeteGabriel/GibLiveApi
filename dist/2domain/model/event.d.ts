export declare abstract class Event {
    code: string;
    operator: string;
    time: string;
    status: string;
    from: string;
    to: string;
    protected formatTime(time: string): string;
    private parseHours;
    private parseMinutes;
    private toLocalIsoString;
}
