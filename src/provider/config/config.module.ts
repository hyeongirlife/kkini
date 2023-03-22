import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService], // !! provide 한 모듈의 인스턴스를 해당 모듈에서 생성할 수 있음
  exports: [ConfigService], // !! 다른 모듈에서 import 해서 사용할 수 있도록 하는 프로퍼티
})
export class ConfigModule {}
