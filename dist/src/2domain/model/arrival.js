"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arrival = void 0;
const event_1 = require("./event");
class Arrival extends event_1.Event {
    constructor(params) {
        super();
        this.code = params.code;
        this.operator = params.operator;
        this.time = params.time;
        this.status = params.status.toLowerCase();
        this.from = params.from;
        this.date = "";
    }
}
exports.Arrival = Arrival;
//# sourceMappingURL=arrival.js.map