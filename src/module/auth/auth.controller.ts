import { UsersService } from '@module/users/users.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { CreateUserDTO } from './dto/auth-register-body.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {
    // 카카오 로그인 버튼을 눌렀을 때, 인가 코드를 받아오기 위한 리다이렉트
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(
    @Req() req,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    // 카카오 로그인 후 콜백 URL로 리다이렉트될 때, 인가 코드를 받아와서 처리
    const token = await this.userService.setJwtToken(reply, req.user);
    reply.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  }
  @Post('/signup')
  async register(
    @Body() createUserDTO: CreateUserDTO,
    @Res() reply: FastifyReply,
  ) {
    // !! 회원가입 (인증 및 유저정보 생성) -> 토큰 발급 (access,refresh)
    const loggedUserData = await this.authService.register(createUserDTO);
    await this.userService.setJwtToken(reply, loggedUserData);
    reply.status(HttpStatus.CREATED).send('Created');
  }

  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO, @Res() reply: FastifyReply) {
    const loggedUserData = await this.authService.login(loginUserDTO);
    await this.userService.setJwtToken(reply, loggedUserData);
    reply.status(HttpStatus.OK).send('Ok');
  }
}
