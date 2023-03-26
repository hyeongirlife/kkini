import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@module/users/users.module';
import { UtilsModule } from '@provider/utils';
import { PrismaModule } from '@provider/prisma';
// import { CookieModule } from '@provider/cookie';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [UsersModule, PrismaModule, UtilsModule],
  providers: [AuthService, KakaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
