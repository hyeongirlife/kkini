import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

export class AuthRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(createUserDTO: CreateUserDTO): Promise<User> {
    const { username, password } = createUserDTO;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}
