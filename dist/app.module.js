"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./1presentation/app.controller");
const app_service_1 = require("./2domain/app.service");
const service_crawler_1 = require("./2domain/service.crawler");
const cache_1 = require("./3infra/cache/cache");
const web_gateway_impl_1 = require("./3infra/impl/web_gateway_impl");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, service_crawler_1.Crawler, cache_1.Cache, web_gateway_impl_1.default],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map