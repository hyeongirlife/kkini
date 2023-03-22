import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [AuthModule, TypeOrmModule.forRoot[(JSON.parse(config)], // !! TypeORM 설정 적용
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
