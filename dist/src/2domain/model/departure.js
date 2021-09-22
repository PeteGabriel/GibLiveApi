"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departure = void 0;
const event_1 = require("./event");
class Departure extends event_1.Event {
    constructor(params) {
        super();
        this.code = params.code;
        this.operator = params.operator;
        this.time = params.time;
        this.status = params.status.toLowerCase();
        this.to = params.to;
        this.date = "";
    }
}
exports.Departure = Departure;
//# sourceMappingURL=departure.js.map