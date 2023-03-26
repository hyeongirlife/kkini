export declare class UtilsService {
    private readonly hashSalt;
    constructor(hashSalt: number);
    mode(): {
        isDev: boolean;
        isProd: boolean;
    };
    hashGenerate(str: string): Promise<string>;
    hashCompare(plain: string, hashed: string): Promise<boolean>;
}
