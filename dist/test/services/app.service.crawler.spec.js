"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_crawler_1 = require("../../src/2domain/service.crawler");
const arrival_1 = require("./../../src/2domain/model/arrival");
const web_gateway_impl_1 = require("./../../src/3infra/impl/web_gateway_impl");
const cache_1 = require("./../../src/3infra/cache/cache");
const departure_1 = require("../../src/2domain/model/departure");
describe('Crawler Service', () => {
    let svc;
    beforeAll(() => {
        svc = new service_crawler_1.Crawler(new web_gateway_impl_1.default(new cache_1.Cache()));
    });
    it('Get table of departures for today', () => __awaiter(void 0, void 0, void 0, function* () {
        const departures = yield svc.getDeparturesInfo();
        expect(departures.length).toBeGreaterThan(0);
        const example = departures[0];
        expect(example.date).toBeDefined();
        expect(example.events.length).toBeGreaterThan(0);
        const todaysTime = new Date().toISOString().slice(0, 10);
        example.events.forEach(event => {
            expect(event.code).toBeDefined();
            expect(event.operator).toBeDefined();
            expect(event.status).toBeDefined();
            expect(event.time).toBeDefined();
            expect(event.to).toBeDefined();
            expect(event.time.startsWith(todaysTime)).toBeTruthy();
        });
    }));
    it('Get table of arrivals for today', () => __awaiter(void 0, void 0, void 0, function* () {
        const arrivals = yield svc.getArrivalsInfo();
        expect(arrivals.length).toBeGreaterThan(0);
        const example = arrivals[0];
        expect(example.date).toBeDefined();
        expect(example.events.length).toBeGreaterThan(0);
        const todaysTime = new Date().toISOString().slice(0, 10);
        example.events.forEach(event => {
            expect(event.time.startsWith(todaysTime)).toBeTruthy();
        });
    }));
    describe('Getting info about next flight', () => {
        it("should not display flights that already arrived/departed", () => __awaiter(void 0, void 0, void 0, function* () {
            const nextFlight = yield svc.getNextFlight(arrived, departed);
            expect(nextFlight).toBe(null);
        }));
        it("should decide between flights scheduled for today if possible", () => __awaiter(void 0, void 0, void 0, function* () {
            const nextFlight = yield svc.getNextFlight(arrivals, departures);
            const expectedFlight = new arrival_1.Arrival({
                code: "EZY8901",
                operator: "EasyJet",
                time: "2021-02-17T11:11:50.799Z",
                status: "Scheduled ",
                from: "London Gatwick"
            });
            expect(nextFlight.code).toBe(expectedFlight.code);
            expect(nextFlight.operator).toBe(expectedFlight.operator);
            expect(nextFlight.time).toBe(expectedFlight.time);
            expect(nextFlight.status).toBe(expectedFlight.status);
            expect(nextFlight.from).toBe(expectedFlight.from);
        }));
        it("should decide between flights scheduled for tomorrow if today's flights have already arrived/departed", () => __awaiter(void 0, void 0, void 0, function* () {
            const nextFlight = yield svc.getNextFlight(nextFlightArrivals, nextFlightDepartures);
            const expectedFlight = new departure_1.Departure({
                "code": "EZY8902",
                "operator": "EasyJet",
                "time": "2021-02-17T20:00:00.000Z",
                "status": "Scheduled ",
                "to": "London Gatwick"
            });
            expect(nextFlight.code).toBe(expectedFlight.code);
            expect(nextFlight.operator).toBe(expectedFlight.operator);
            expect(nextFlight.time).toBe(expectedFlight.time);
            expect(nextFlight.status).toBe(expectedFlight.status);
            expect(nextFlight.from).toBe(expectedFlight.from);
        }));
    });
});
const departed = [
    {
        date: "Thursday 10th of September 2020",
        events: [
            new departure_1.Departure({
                code: "EZY1964",
                operator: "EasyJet",
                time: "2020-09-09T11:11:08.978Z",
                status: "Departed 10:50",
                to: "Manchester"
            }),
            new departure_1.Departure({
                code: "EZY8902",
                operator: "EasyJet",
                time: "2020-09-09T11:11:08.978Z",
                status: "Departed 11:35",
                to: "London Gatwick"
            }),
            new departure_1.Departure({
                code: "BA493",
                operator: "BA",
                time: "2020-09-09T11:11:08.978Z",
                status: "Departed 11:50",
                to: "London Heathrow"
            })
        ]
    }
];
const arrived = [
    {
        date: "Thursday 10th of September 2020",
        events: [
            new arrival_1.Arrival({
                code: "EZY6300",
                operator: "EasyJet",
                time: "2020-09-09T11:11:08.978Z",
                status: "Arrived 11:11",
                to: "Bristol"
            }),
            new arrival_1.Arrival({
                code: "EZY8902",
                operator: "EasyJet",
                time: "2020-09-09T11:11:08.978Z",
                status: "Arrived 11:11",
                to: "London Gatwick"
            }),
            new arrival_1.Arrival({
                code: "BA493",
                operator: "BA",
                time: "2020-09-09T11:11:08.978Z",
                status: "Arrived 11:11",
                to: "London Heathrow"
            })
        ]
    }
];
const arrivals = [
    {
        "date": "Friday 19th of February 2021",
        "events": [
            new arrival_1.Arrival({
                code: "EZY8901",
                operator: "EasyJet",
                time: "2021-02-17T11:11:50.799Z",
                status: "Scheduled ",
                from: "London Gatwick"
            })
        ]
    },
    {
        "date": "Saturday 20th of February 2021",
        "events": [
            new arrival_1.Arrival({
                "code": "BA492",
                "operator": "BA",
                "time": "2021-02-17T14:14:50.799Z",
                "status": "Scheduled ",
                "from": "London Heathrow"
            })
        ]
    },
    {
        "date": "Sunday 21st of February 2021",
        "events": [
            new arrival_1.Arrival({
                "code": "EZY8901",
                "operator": "EasyJet",
                "time": "2021-02-17T11:11:50.799Z",
                "status": "Scheduled ",
                "from": "London Gatwick"
            })
        ]
    }
];
const departures = [
    {
        "date": "Friday 19th of February 2021",
        "events": [
            new departure_1.Departure({
                "code": "EZY8902",
                "operator": "EasyJet",
                "time": "2021-02-17T12:12:59.400Z",
                "status": "Scheduled ",
                "to": "London Gatwick"
            })
        ]
    },
    {
        "date": "Saturday 20th of February 2021",
        "events": [
            new departure_1.Departure({
                "code": "BA493",
                "operator": "BA",
                "time": "2021-02-17T15:15:59.400Z",
                "status": "Scheduled ",
                "to": "London Heathrow"
            })
        ]
    },
    {
        "date": "Sunday 21st of February 2021",
        "events": [
            new departure_1.Departure({
                "code": "EZY8902",
                "operator": "EasyJet",
                "time": "2021-02-17T12:12:59.400Z",
                "status": "Scheduled ",
                "to": "London Gatwick"
            })
        ]
    }
];
const nextFlightDepartures = [
    {
        "date": "Friday 19th of February 2021",
        "events": [
            new departure_1.Departure({
                "code": "EZY8902",
                "operator": "EasyJet",
                "time": "2021-02-17T12:12:59.400Z",
                "status": "Departed ",
                "to": "London Gatwick"
            })
        ]
    },
    {
        "date": "Saturday 20th of February 2021",
        "events": [
            new departure_1.Departure({
                "code": "BA493",
                "operator": "BA",
                "time": "2021-02-17T15:15:59.400Z",
                "status": "Canceled ",
                "to": "London Heathrow"
            })
        ]
    },
    {
        "date": "Sunday 21st of February 2021",
        "events": [
            new departure_1.Departure({
                "code": "EZY8902",
                "operator": "EasyJet",
                "time": "2021-02-17T20:00:00.000Z",
                "status": "Scheduled ",
                "to": "London Gatwick"
            })
        ]
    }
];
const nextFlightArrivals = [
    {
        "date": "Friday 19th of February 2021",
        "events": [
            new arrival_1.Arrival({
                code: "EZY8901",
                operator: "EasyJet",
                time: "2021-02-17T11:11:50.799Z",
                status: "Arrived ",
                from: "London City"
            })
        ]
    },
    {
        "date": "Saturday 20th of February 2021",
        "events": [
            new arrival_1.Arrival({
                "code": "BA492",
                "operator": "BA",
                "time": "2021-02-17T14:14:50.799Z",
                "status": "Diverted ",
                "from": "Birmingham"
            })
        ]
    },
    {
        "date": "Sunday 21st of February 2021",
        "events": [
            new arrival_1.Arrival({
                "code": "EZY8901",
                "operator": "EasyJet",
                "time": "2021-02-17T20:11:50.799Z",
                "status": "Scheduled ",
                "from": "London Gatwick"
            })
        ]
    }
];
//# sourceMappingURL=app.service.crawler.spec.js.map