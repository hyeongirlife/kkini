"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    app: {
        environment: 'development',
        port: 8080,
        clientHost: 'http://localhost:3000',
        apiHost: 'http://localhost:8080',
    },
    database: {
        provider: 'postgresql',
        host: 'localhost',
        database: 'kkini',
        port: 5432,
        userName: 'hyeongeol',
        password: 'dlgusrjf1!',
    },
    jwt: {
        jwtSecretKey: '123123',
        cookieSecretKey: '456456',
        accessTokenMaxAge: 1000 * 60 * 5,
        refreshTokenMaxAge: 1000 * 60 * 60 * 24 * 7,
    },
    throttle: {
        ttl: 1000 * 60,
        limit: 100,
    },
};
//# sourceMappingURL=development.js.map