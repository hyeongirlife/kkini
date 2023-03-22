import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDTO: CreateUserDTO): Promise<User>;
}
