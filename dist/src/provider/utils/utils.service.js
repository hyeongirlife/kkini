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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const utils_constants_1 = require("./utils.constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UtilsService = class UtilsService {
    constructor(hashSalt) {
        this.hashSalt = hashSalt;
    }
    mode() {
        const isDev = process.env.NODE_ENV !== 'production';
        return {
            isDev,
            isProd: !isDev,
        };
    }
    async hashGenerate(str) {
        try {
            const salt = await bcrypt_1.default.genSalt(this.hashSalt);
            const hash = await bcrypt_1.default.hash(str, salt);
            return hash;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async hashCompare(plain, hashed) {
        try {
            const isMatch = await bcrypt_1.default.compare(plain, hashed);
            return isMatch;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(utils_constants_1.HASH_SALT_OR_ROUND)),
    __metadata("design:paramtypes", [Number])
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map