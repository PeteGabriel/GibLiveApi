"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    formatTime(time) {
        const date = new Date();
        date.setHours(this.parseHours(time));
        date.setMinutes(this.parseMinutes(time));
        return this.toLocalIsoString(date);
    }
    parseHours(time) {
        if (time == "" || time == undefined) {
            return -1;
        }
        const parts = time.split(':');
        let hours = 0;
        if (parts.length > 1) {
            hours = Number.parseInt(parts[0]);
        }
        return hours;
    }
    parseMinutes(time) {
        if (time == "" || time == undefined) {
            return -1;
        }
        const parts = time.split(':');
        let minutes = 0;
        if (parts.length > 1) {
            minutes = Number.parseInt(parts[1]);
        }
        return minutes;
    }
    toLocalIsoString(date) {
        function pad(n) { return n < 10 ? '0' + n : n; }
        var localIsoString = date.getFullYear() + '-'
            + pad(date.getMonth() + 1) + '-'
            + pad(date.getDate()) + 'T'
            + pad(date.getHours()) + ':'
            + pad(date.getMinutes());
        if (date.getTimezoneOffset() == 0)
            localIsoString += 'Z';
        return localIsoString;
    }
    ;
}
exports.Event = Event;
//# sourceMappingURL=event.js.map