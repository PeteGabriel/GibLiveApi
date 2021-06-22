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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../2domain/app.service");
const service_crawler_1 = require("../2domain/service.crawler");
const collection_1 = require("./collection");
let AppController = AppController_1 = class AppController {
    constructor(appService, cService) {
        this.appService = appService;
        this.cService = cService;
    }
    root(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const root = {
                "collection": {
                    "version": "1.0",
                    "href": "/",
                    "links": [
                        { "href": request.url + 'departures', "rel": "departures", "render": "link" },
                        { "href": request.url + 'arrivals', "rel": "arrivals", "render": "link" },
                        { "href": request.url + 'next-flight', "rel": "next-flight", "render": "link" }
                    ]
                }
            };
            return JSON.stringify(root);
        });
    }
    departures(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const root = {
                "collection": {
                    version: "1.0",
                    href: request.url,
                    links: [
                        { "href": '/arrivals', "rel": "arrivals", "render": "link" },
                        { "href": '/next-flight', "rel": "next-flight", "render": "link" }
                    ],
                    items: []
                }
            };
            try {
                const departures = yield this.cService.getDeparturesInfo();
                departures.forEach(element => {
                    root.collection.items.push({
                        data: [{ name: "departure", value: element }]
                    });
                });
                return JSON.stringify(root);
            }
            catch (e) {
                throw new common_1.BadGatewayException();
            }
        });
    }
    arrivals(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const root = {
                "collection": {
                    version: "1.0",
                    href: request.url,
                    links: [
                        { "href": '/departures', "rel": "departures", "render": "link" },
                        { "href": '/next-flight', "rel": "next-flight", "render": "link" }
                    ],
                    items: []
                }
            };
            try {
                const arrivals = yield this.cService.getArrivalsInfo();
                arrivals.forEach(element => {
                    root.collection.items.push({
                        data: [{ name: "arrival", value: element }]
                    });
                });
                return JSON.stringify(root);
            }
            catch (e) {
                throw new common_1.BadGatewayException();
            }
        });
    }
    alive() {
        return this.appService.alive();
    }
    next(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let departures = null;
            let arrivals = null;
            try {
                departures = yield this.cService.getDeparturesInfo();
                arrivals = yield this.cService.getArrivalsInfo();
            }
            catch (e) {
                throw new common_1.BadGatewayException();
            }
            const nF = yield this.cService.getNextFlight(arrivals, departures);
            if (nF == null) {
                throw new common_1.NotFoundException("No info was found for the next flight");
            }
            let getItemName = (flight) => flight.from != undefined ? AppController_1.ARRIVAL : AppController_1.DEPARTURE;
            const root = buildSimpleCollection(request.url);
            root.addItem(new collection_1.Item(new collection_1.Data(getItemName(nF), nF)));
            return JSON.stringify({ collection: root });
        });
    }
};
AppController.DEPARTURE = "departure";
AppController.ARRIVAL = "arrival";
__decorate([
    common_1.Get('/'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/vnd.collection+json'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "root", null);
__decorate([
    common_1.Get('/departures'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/vnd.collection+json'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "departures", null);
__decorate([
    common_1.Get('/arrivals'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/vnd.collection+json'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
__decorate([
    common_1.Get('/next-flight'),
    common_1.HttpCode(200),
    common_1.Header('Content-Type', 'application/vnd.collection+json'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "next", null);
AppController = AppController_1 = __decorate([
    common_1.Controller('/'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        service_crawler_1.Crawler])
], AppController);
exports.AppController = AppController;
function buildSimpleCollection(hrefCollection) {
    let collection;
    collection = new collection_1.Collection("1.0", hrefCollection);
    collection.addLink(new collection_1.Link('/arrivals', 'arrivals', 'link'));
    collection.addLink(new collection_1.Link('/departures', 'departures', 'link'));
    return collection;
}
//# sourceMappingURL=app.controller.js.map