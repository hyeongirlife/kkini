import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // !! User 엔티티를 포함한 TypeORM 설정을 적용
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
