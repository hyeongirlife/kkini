import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModule as NestConfigModule } from '@nestjs/config';
import { configuration } from './provider/config';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './module/auth/auth.controller';
import { AuthService } from './module/auth/auth.service';

@Module({
  imports: [
    NestConfigModule.forRoot({ load: [configuration] }),
    ConfigModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
