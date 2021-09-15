"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventComparator = void 0;
class EventComparator {
    compare(a, d) {
        let aa = new Date(a.getTime());
        let dd = new Date(d.getTime());
        if (aa > dd) {
            if (a.getStatus().includes("Arrived")) {
                return -1;
            }
            return 1;
        }
        else if (aa < dd) {
            if (d.getStatus().includes("Departed")) {
                return 1;
            }
            return -1;
        }
        else {
            return 0;
        }
    }
}
exports.EventComparator = EventComparator;
//# sourceMappingURL=event_comparator.js.map