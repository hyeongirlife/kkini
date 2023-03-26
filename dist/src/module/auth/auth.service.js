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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const errors_constants_1 = require("../../constants/errors/errors.constants");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../provider/prisma");
const utils_1 = require("../../provider/utils");
let AuthService = class AuthService {
    constructor(userService, prismaService, utils) {
        this.userService = userService;
        this.prismaService = prismaService;
        this.utils = utils;
    }
    async register(body) {
        try {
            const { email, username, password } = body;
            const emailExists = await this.userService.checkExistsUser(email, 'email');
            if (emailExists) {
                throw new common_1.ConflictException(errors_constants_1.DUPLICATED_EMAIL);
            }
            const usernameExists = await this.userService.checkExistsUser(username, 'username');
            if (usernameExists) {
                throw new common_1.ConflictException(errors_constants_1.DUPLICATED_USERNAME);
            }
            const hashedPassword = await this.utils.hashGenerate(password);
            const user = await this.userService.createUser(username, email, hashedPassword);
            const loggedUserData = await this.userService.getLoggedUserData(user.id);
            return loggedUserData;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async login(body) {
        try {
            const { email, password: plainPassword } = body;
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new common_1.NotFoundException(errors_constants_1.LOGIN_INFORMATION_NOT_MATCH);
            }
            const isMatch = await this.utils.hashCompare(plainPassword, user.password);
            if (!isMatch) {
                throw new common_1.ConflictException(errors_constants_1.LOGIN_INFORMATION_NOT_MATCH);
            }
            const loggedUserData = await this.userService.getLoggedUserData(user.id);
            return loggedUserData;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_1.PrismaService,
        utils_1.UtilsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map