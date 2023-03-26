import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config';
import { Config } from './config.interface';
export declare class ConfigService<K = Config> extends NestConfig<K> {
    get<P extends Path<K>>(path: P): PathValue<K, P>;
}
