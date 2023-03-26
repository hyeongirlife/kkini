import { LoggedUserData } from '@module/users/users.interface';
import { LoginUserDTO, CreateUserDTO } from '@module/auth/dto';
import { UsersService } from '@module/users/users.service';
import { PrismaService } from '@provider/prisma';
import { UtilsService } from '@provider/utils';
export declare class AuthService {
    private readonly userService;
    private readonly prismaService;
    private readonly utils;
    constructor(userService: UsersService, prismaService: PrismaService, utils: UtilsService);
    register(body: CreateUserDTO): Promise<LoggedUserData>;
    login(body: LoginUserDTO): Promise<LoggedUserData>;
}
