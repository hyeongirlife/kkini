import { IsEmail, IsString } from '@nestjs/class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
