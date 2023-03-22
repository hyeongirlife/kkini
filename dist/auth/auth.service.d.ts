import { AuthRepository } from './auth.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    signUp(createUserDTO: CreateUserDTO): Promise<User>;
}
