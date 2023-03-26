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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let JwtService = class JwtService {
    constructor(config) {
        this.config = config;
    }
    signToken(payload, options) {
        const apiHost = this.config.get('app.apiHost');
        const jwtSecretKey = this.config.get('jwt.jwtSecretKey');
        const jwtOptions = Object.assign({ issuer: apiHost }, options);
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(payload, jwtSecretKey, jwtOptions, (error, token) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(token);
            });
        });
    }
    decodeToken(token) {
        const jwtSecretKey = this.config.get('jwt.jwtSecretKey');
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, jwtSecretKey, (error, decoded) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!decoded) {
                    throw new Error('Decoded data is undefined');
                }
                resolve(decoded);
            });
        });
    }
};
JwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtService);
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map