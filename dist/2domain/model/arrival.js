"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("./event");
class Arrival extends event_1.Event {
    constructor(params) {
        super();
        this.code = params.code;
        this.operator = params.operator;
        this.time = this.formatTime(params.time);
        this.status = params.status;
        this.from = params.from;
    }
}
exports.Arrival = Arrival;
//# sourceMappingURL=arrival.js.map