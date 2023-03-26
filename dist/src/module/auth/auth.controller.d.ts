import { UsersService } from '@module/users/users.service';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto';
import { CreateUserDTO } from './dto/auth-register-body.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    register(createUserDTO: CreateUserDTO, reply: FastifyReply): Promise<void>;
    login(loginUserDTO: LoginUserDTO, reply: FastifyReply): Promise<void>;
}
