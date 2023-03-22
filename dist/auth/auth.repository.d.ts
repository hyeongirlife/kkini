import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class AuthRepository extends Repository<User> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    signUp(createUserDTO: CreateUserDTO): Promise<User>;
}
