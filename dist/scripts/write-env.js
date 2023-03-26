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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class WriteEnv {
    constructor() {
        const stdin = process.stdin;
        if (process.stdin.isTTY) {
            stdin.setRawMode(false);
        }
        stdin.on('data', async (key) => {
            if (key.toString() === '\u0003') {
                await this.write();
            }
        });
    }
    async write() {
        const isDev = process.env.NODE_ENV !== 'production';
        const envFile = isDev ? 'development' : 'production';
        const configFilePath = path_1.default.resolve(process.cwd(), `config/${envFile}.ts`);
        if (!fs_1.default.existsSync(configFilePath)) {
            throw new Error(`Not found [${envFile}.ts] config file`);
        }
        const { config } = await Promise.resolve().then(() => __importStar(require(configFilePath)));
        const { app } = config;
        const { provider, host, database, userName, port, password } = config.database;
        const databaseUrl = `${provider}://${userName}:${password}@${host}:${port}/${database}?schema=public`;
        const envFilePath = path_1.default.resolve(process.cwd(), `.env`);
        fs_1.default.writeFileSync(envFilePath, `PORT=${app.port}
      DATABASE_URL=${databaseUrl}
      `.replace(/ /gi, ''));
    }
}
const createEnv = new WriteEnv();
createEnv.write().then(() => {
    process.exit(0);
});
//# sourceMappingURL=write-env.js.map