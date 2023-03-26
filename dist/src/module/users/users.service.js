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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../provider/config");
const cookie_1 = require("../../provider/cookie");
const jwt_service_1 = require("../../provider/jwt/jwt.service");
const prisma_1 = require("../../provider/prisma");
let UsersService = class UsersService {
    constructor(config, jwt, cookie, prisma) {
        this.config = config;
        this.jwt = jwt;
        this.cookie = cookie;
        this.prisma = prisma;
    }
    async setJwtToken(reply, LoggedUserData) {
        try {
            const jwtConfig = this.config.get('jwt');
            const { accessTokenMaxAge, refreshTokenMaxAge } = jwtConfig;
            const accessToken = this.jwt.signToken({ user: LoggedUserData }, {
                expiresIn: accessTokenMaxAge,
            });
            const refreshToken = this.jwt.signToken({ userId: LoggedUserData.id }, {
                expiresIn: refreshTokenMaxAge,
            });
            await this.cookie.setCookie(reply, 'access_token', accessToken, {
                maxAge: accessTokenMaxAge / 1000,
            });
            await this.cookie.setCookie(reply, 'refresh_token', refreshToken, {
                maxAge: refreshTokenMaxAge / 1000,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getLoggedUserData(userId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    createdAt: true,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('Not found user');
            }
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async createUser(username, email, hasedPassword) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    username,
                    email,
                    password: hasedPassword,
                },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async checkExistsUser(arg, provider) {
        const whereQuery = {
            [provider]: arg,
        };
        try {
            const exists = await this.prisma.user.findFirst({
                where: whereQuery,
            });
            return !!exists;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_service_1.JwtService,
        cookie_1.CookieService,
        prisma_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map