"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arrival {
    constructor(params) {
        this.code = params.code;
        this.operator = params.operator;
        this.time = this.formatTime(params.extendedDate, params.time);
        this.status = params.status;
        this.from = params.from;
    }
    formatTime(extendedDate, time) {
        const date = new Date();
        date.setHours(this.parseHours(time));
        date.setMinutes(this.parseMinutes(time));
        return date.toISOString();
    }
    parseHours(time) {
        const parts = time.split(':');
        let hours = 0;
        if (parts.length > 1) {
            hours = Number.parseInt(parts[0]);
        }
        return hours;
    }
    parseMinutes(time) {
        const parts = time.split(':');
        let minutes = 0;
        if (parts.length > 1) {
            minutes = Number.parseInt(parts[0]);
        }
        return minutes;
    }
}
exports.Arrival = Arrival;
//# sourceMappingURL=arrival.js.map