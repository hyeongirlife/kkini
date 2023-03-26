import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-kakao';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import { PrismaService } from '@provider/prisma';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private authService: AuthService, private prisma: PrismaService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const kakaoId = profile.id;
    const email = profile._json && profile._json.kakao_account?.email;

    if (!kakaoId || !email) {
      return done('Kakao profile is invalid', null);
    }

    const user: User = await this.prisma.user.findUnique({
      where: { id: kakaoId },
    });

    if (!user) {
      return done('Cannot find kakao user', null);
    }
  }
}
