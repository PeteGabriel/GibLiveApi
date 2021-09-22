"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrival_1 = require("../../src/2domain/model/arrival");
const departure_1 = require("../../src/2domain/model/departure");
const event_comparator_1 = require("../../src/2domain/impl/event_comparator");
describe('EventComparator interface implementation', () => {
    it('should decide correctly when an arrival happens first', () => {
        let a = new arrival_1.Arrival({
            time: "2020-09-09T11:11:29.446Z",
            status: ""
        });
        let d = new departure_1.Departure({
            time: "2020-09-09T15:15:03.515Z",
            status: ""
        });
        let comp = new event_comparator_1.EventComparator();
        let res = comp.compare(a, d);
        expect(res).toBeLessThan(0);
    });
    it('should decide correctly when a departure happens first', () => {
        let a = new arrival_1.Arrival({
            time: "2020-09-09T15:15:03.515Z",
            status: ""
        });
        let d = new departure_1.Departure({
            time: "2020-09-09T11:11:29.446Z",
            status: ""
        });
        let comp = new event_comparator_1.EventComparator();
        let res = comp.compare(a, d);
        expect(res).toBeGreaterThan(0);
    });
    it('should decide correctly when both are equal', () => {
        let a = new arrival_1.Arrival({
            time: "2020-09-09T15:15:03.515Z",
            status: ""
        });
        let d = new departure_1.Departure({
            time: "2020-09-09T15:15:03.515Z",
            status: ""
        });
        let comp = new event_comparator_1.EventComparator();
        let res = comp.compare(a, d);
        expect(res).toEqual(0);
    });
});
//# sourceMappingURL=event_comparator.spec.js.map