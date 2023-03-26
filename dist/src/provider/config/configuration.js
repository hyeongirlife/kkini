"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const joi_1 = __importDefault(require("joi"));
const validate = (config) => {
    const schema = joi_1.default.object().keys({
        app: joi_1.default.object().keys({
            environment: joi_1.default.string().valid('development', 'production').required(),
            port: joi_1.default.number().required(),
            clientHost: joi_1.default.string().required(),
            apiHost: joi_1.default.string().required(),
        }),
        jwt: joi_1.default.object().keys({
            jwtSecretKey: joi_1.default.string().required(),
            cookieSecretKey: joi_1.default.string().required(),
            accessTokenMaxAge: joi_1.default.number().integer().required(),
            refreshTokenMaxAge: joi_1.default.number().integer().required(),
        }),
        database: joi_1.default.object().keys({
            provider: joi_1.default.string().required(),
            host: joi_1.default.string().required(),
            database: joi_1.default.string().required(),
            port: joi_1.default.number().required(),
            userName: joi_1.default.string().required(),
            password: joi_1.default.string().allow('').required(),
        }),
        throttle: joi_1.default.object().keys({
            ttl: joi_1.default.number().integer().required(),
            limit: joi_1.default.number().integer().required(),
        }),
    });
    const { error } = schema.validate(config);
    if (error) {
        throw new Error(`config validate failed, message: ${error.message}`);
    }
};
const configuration = async () => {
    const fileName = process.env.NODE_ENV || 'development';
    const filePath = path_1.default.resolve(process.cwd(), `config/${fileName}.ts`);
    const exists = await fs_1.default.existsSync(filePath);
    if (!exists) {
        throw new Error(`Missing ${fileName} env file`);
    }
    const { config } = await Promise.resolve().then(() => __importStar(require(`../../../config/${fileName}`)));
    validate(config);
    return config;
};
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map