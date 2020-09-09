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
const web_gateway_impl_1 = require("./../../src/3infra/impl/web_gateway_impl");
const cache_1 = require("./../../src/3infra/cache/cache");
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
});
//# sourceMappingURL=app.service.crawler.spec.js.map