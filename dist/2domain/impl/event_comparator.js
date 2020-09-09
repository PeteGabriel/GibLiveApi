"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventComparator = void 0;
class EventComparator {
    compare(a, d) {
        let aa = Date.parse(a.time);
        let dd = Date.parse(d.time);
        console.log(aa);
        console.log(dd);
        console.log(aa - dd);
        return aa - dd;
    }
}
exports.EventComparator = EventComparator;
//# sourceMappingURL=event_comparator.js.map