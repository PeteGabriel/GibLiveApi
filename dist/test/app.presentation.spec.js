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
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const app_module_1 = require("../src/app.module");
describe('AppController (e2e)', () => {
    let app;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleFixture = yield testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        yield app.init();
    }));
    it('/alive (GET)', () => {
        return request(app.getHttpServer())
            .get('/alive')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect('{\"version\":0.1}');
    });
    it('/departures (GET)', () => {
        return request(app.getHttpServer())
            .get('/alive')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect('{\"version\":0.1}');
    });
});
//# sourceMappingURL=app.presentation.spec.js.map