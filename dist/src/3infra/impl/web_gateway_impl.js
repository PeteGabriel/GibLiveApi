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
const cheerio = require("cheerio");
const p = require("phin");
const common_1 = require("@nestjs/common");
const cache_1 = require("../cache/cache");
let WebGatewayImpl = class WebGatewayImpl {
    constructor(c) {
        this.c = c;
        this.cache = c;
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const key = 'live_flight_info';
            yield this.cache.get(key).
                then((cached) => __awaiter(this, void 0, void 0, function* () {
                yield p({
                    'url': 'https://www.gibraltarairport.gi/content/live-flight-info',
                    'core': {
                        timeout: 2000
                    }
                })
                    .then(res => this.$ = cheerio.load(res.body))
                    .catch(err => {
                    if (err)
                        throw new Error("could not connect to Gib airport gateway");
                });
            }));
        });
    }
    load(classId) {
        const key = 'live_flight_key';
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield this.cache.get(key)
                .catch(err => {
                if (err)
                    reject(err);
            })
                .then(res => {
                resolve(this.$(classId));
            });
        }));
    }
};
WebGatewayImpl = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cache_1.Cache])
], WebGatewayImpl);
exports.default = WebGatewayImpl;
//# sourceMappingURL=web_gateway_impl.js.map