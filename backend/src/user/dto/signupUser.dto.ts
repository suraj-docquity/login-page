import { IsEmail, IsNumber, IsString, IsStrongPassword, Matches } from 'class-validator';
import { patterns } from '../../auth/input.validator';

export class SignupUserDTO {
  @IsString()
  Name: string;

  @IsEmail()
  @Matches(patterns.email_regex)
  Email: string;

  @IsString()
  Username: string;

  @IsNumber()
  @Matches(patterns.phone_regex)
  Phone: number;

  @IsStrongPassword()
  @Matches(patterns.pass_regex)
  Password: string;
}
