"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Crawler = void 0;
const common_1 = require("@nestjs/common");
const departure_1 = require("./model/departure");
const web_gateway_impl_1 = require("./../3infra/impl/web_gateway_impl");
const daily_event_1 = require("./model/daily_event");
const arrival_1 = require("./../2domain/model/arrival");
const event_comparator_1 = require("./impl/event_comparator");
let Crawler = class Crawler {
    constructor(g) {
        this.g = g;
        this.gate = g;
    }
    loadFlightDateHtmlInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.gate.load('.flight-info-tables');
            return info.find('.pt').map((_, t) => t.children[0].data);
        });
    }
    getArrivalsInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gate.setup();
            }
            catch (e) {
                throw e;
            }
            const dailyEvts = new Array();
            const flightDates = yield this.loadFlightDateHtmlInfo();
            let tables = yield this.getArrivalsByDate(flightDates);
            this.extractDataFromNodes(tables);
            for (let index = 0; index < tables.length; index++) {
                const arrivals = new Array();
                const date = flightDates[index];
                tables[index].table.forEach(data => {
                    let newDep = new arrival_1.Arrival({
                        time: data[0],
                        code: data[1],
                        operator: data[2],
                        from: data[3],
                        status: data[4]
                    });
                    arrivals.push(newDep);
                });
                dailyEvts.push(new daily_event_1.DailyEvent({ date: date, events: arrivals }));
            }
            return dailyEvts;
        });
    }
    getDeparturesInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.gate.setup();
            }
            catch (e) {
                throw e;
            }
            const flightDates = yield this.loadFlightDateHtmlInfo();
            let tables = yield this.getDeparturesByDate(flightDates);
            this.extractDataFromNodes(tables);
            let dailyDepartures = new Array();
            for (let index = 0; index < tables.length; index++) {
                const departures = new Array();
                const date = flightDates[index];
                tables[index].table.forEach(data => {
                    let newDep = new departure_1.Departure({
                        time: data[0],
                        code: data[1],
                        operator: data[2],
                        to: data[3],
                        status: data[4]
                    });
                    departures.push(newDep);
                });
                dailyDepartures.push(new daily_event_1.DailyEvent({ date, events: departures }));
            }
            return dailyDepartures;
        });
    }
    getNextFlight(arrivals, departures) {
        return __awaiter(this, void 0, void 0, function* () {
            if (departures.length == 0 && arrivals.length == 0) {
                return null;
            }
            for (let i = 0; i <= (departures.length - 1); i++) {
                let dailyArival = arrivals[i];
                let dailyDepartures = departures[i];
                for (let j = 0; j <= (dailyDepartures.events.length - 1); j++) {
                    let arrivalEvent = dailyArival.events[j];
                    let departuresEvent = dailyDepartures.events[j];
                    let comp = new event_comparator_1.EventComparator();
                    let res = comp.compare(arrivalEvent, departuresEvent);
                    if (res <= 0) {
                        return arrivalEvent;
                    }
                    else {
                        return departuresEvent;
                    }
                }
            }
            return null;
        });
    }
    extractDataFromNodes(tables) {
        tables.forEach((elem) => {
            elem.table = elem.table.children.map((i, e) => {
                if (i.name == 'tr') {
                    return i.childNodes.map(n => {
                        if (n.name == 'td') {
                            if (n.childNodes[0].name == 'img') {
                                return this.extractAirplaneCia(n);
                            }
                            else {
                                return n.childNodes[0].data;
                            }
                        }
                    })
                        .filter((e) => e != undefined);
                }
                return undefined;
            }).filter((e) => e != undefined);
        });
    }
    extractAirplaneCia(n) {
        const parts = n.childNodes[0].attribs['src'].split('/');
        const airplaneCia = parts[parts.length - 1].split('_')[0];
        return airplaneCia;
    }
    getArrivalsByDate(flightDates) {
        return __awaiter(this, void 0, void 0, function* () {
            let allTheDepData = yield this.gate.load('.tab-arrivals div');
            allTheDepData = allTheDepData.find(yield this.gate.load('tbody'));
            let tables = [];
            allTheDepData.each((i, n) => tables.push(new FlightTable(flightDates[i], n)));
            return tables;
        });
    }
    getDeparturesByDate(flightDates) {
        return __awaiter(this, void 0, void 0, function* () {
            let allTheDepData = yield this.gate.load('.tab-departures div');
            allTheDepData = allTheDepData.find(yield this.gate.load('tbody'));
            let tables = [];
            allTheDepData.each((i, n) => tables.push(new FlightTable(flightDates[i], n)));
            return tables;
        });
    }
};
Crawler = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [web_gateway_impl_1.default])
], Crawler);
exports.Crawler = Crawler;
class FlightTable {
    constructor(date, table) {
        this.date = date;
        this.table = table;
    }
}
//# sourceMappingURL=service.crawler.js.map