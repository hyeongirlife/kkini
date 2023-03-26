import { ConfigService } from '@provider/config';
import { SignOptions } from 'jsonwebtoken';
export declare class JwtService {
    private readonly config;
    constructor(config: ConfigService);
    signToken(payload: any, options?: SignOptions): Promise<string>;
    decodeToken<T>(token: string): Promise<T>;
}
