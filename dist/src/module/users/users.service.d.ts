import { LoggedUserData } from '@module/users/users.interface';
import { User } from '@prisma/client';
import { ConfigService } from '@provider/config';
import { CookieService } from '@provider/cookie';
import { JwtService } from '@provider/jwt/jwt.service';
import { PrismaService } from '@provider/prisma';
import { FastifyReply } from 'fastify';
export declare class UsersService {
    private readonly config;
    private readonly jwt;
    private readonly cookie;
    private readonly prisma;
    constructor(config: ConfigService, jwt: JwtService, cookie: CookieService, prisma: PrismaService);
    setJwtToken(reply: FastifyReply, LoggedUserData: LoggedUserData): Promise<void>;
    getLoggedUserData(userId: string): Promise<LoggedUserData>;
    createUser(username: string, email: string, hasedPassword: string): Promise<User>;
    checkExistsUser(arg: string, provider: 'email' | 'username'): Promise<boolean>;
    findByEmail(email: string): Promise<User | undefined>;
}
