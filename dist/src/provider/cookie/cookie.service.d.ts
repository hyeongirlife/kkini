import { ConfigService } from '@provider/config';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { CookieSerializeOptions } from '@fastify/cookie';
import { UtilsService } from '@provider/utils/utils.service';
export declare class CookieService {
    private readonly config;
    private readonly utils;
    constructor(config: ConfigService, utils: UtilsService);
    setCookie(reply: FastifyReply, name: string, payload: any, options?: CookieSerializeOptions): Promise<void>;
    getCookie(request: FastifyRequest, name: string): Promise<string | undefined>;
    clearCookie(reply: FastifyReply, name: string): Promise<void>;
}
