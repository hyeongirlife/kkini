import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { CreateUserDTO } from './dto/auth-register-body.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async register(
    @Body() createUserDTO: CreateUserDTO,
    @Res() reply: FastifyReply,
  ) {
    await this.authService.register(createUserDTO);
    reply.status(HttpStatus.CREATED).send('Created');
  }

  @Post('/login')
  async login(@Body() loginUserDTO: LoginUserDTO, @Res() reply: FastifyReply) {
    await this.authService.login(loginUserDTO);
    reply.status(HttpStatus.OK).send('Ok');
  }
}
