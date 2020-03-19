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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("../2domain/app.service");
const service_crawler_1 = require("../2domain/service.crawler");
let AppController = class AppController {
    constructor(appService, cService) {
        this.appService = appService;
        this.cService = cService;
    }
    departures() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.stringify(yield this.cService.getDeparturesInfo());
        });
    }
    arrivals() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.stringify(yield this.cService.getArrivalsInfo());
        });
    }
    alive() {
        return this.appService.alive();
    }
};
__decorate([
    common_1.Get('/departures'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "departures", null);
__decorate([
    common_1.Get('/arrivals'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "arrivals", null);
__decorate([
    common_1.Get('alive'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "alive", null);
AppController = __decorate([
    common_1.Controller('/'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        service_crawler_1.Crawler])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map