"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const departure_1 = require("../../src/2domain/model/departure");
describe('Event creation', () => {
    it('should format the date correctly', () => {
        let departure = new departure_1.Departure({
            time: '17:10',
            code: 'BA3289',
            operator: 'BA',
            to: 'London City',
            status: 'Scheduled ',
        });
        expect(departure.time).toContain("17:10");
    });
});
//# sourceMappingURL=event.spec.js.map