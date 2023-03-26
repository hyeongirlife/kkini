"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptProvider = void 0;
const utils_constants_1 = require("./utils.constants");
exports.bcryptProvider = [
    {
        useFactory: () => {
            return utils_constants_1.HASH_SALT;
        },
        provide: utils_constants_1.HASH_SALT_OR_ROUND,
    },
];
//# sourceMappingURL=utils.provider.js.map