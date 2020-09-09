"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    formatTime(time) {
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
exports.Event = Event;
//# sourceMappingURL=event.js.map