import { IsEmail, IsString, Matches } from 'class-validator';
import { patterns } from '../../auth/input.validator';

export class LoginUserDTO {
  @IsString()
  Name: string;

  @IsEmail()
  @Matches(patterns.email_regex)
  Email: string;

  @IsString()
  Password: string;
}
