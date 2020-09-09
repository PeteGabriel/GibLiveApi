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
const arrival_1 = require("../../src/2domain/model/arrival");
const departure_1 = require("../../src/2domain/model/departure");
const event_comparator_1 = require("../../src/2domain/impl/event_comparator");
describe('EventComparator interface implementation', () => {
    it('should decide correctly when a departure happens first', () => __awaiter(void 0, void 0, void 0, function* () {
        let a = new arrival_1.Arrival({
            time: "2020-09-09T11:11:29.446Z"
        });
        let d = new departure_1.Departure({
            time: "2020-09-09T11:05:29.655Z"
        });
        let comp = new event_comparator_1.EventComparator();
        let res = comp.compare(a, d);
        expect(res).toBeLessThan(0);
    }));
});
//# sourceMappingURL=event_comparator.spec.js.map