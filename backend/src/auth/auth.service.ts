import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(Email: string, Password: string) {
    const user = await this.userService.findByEmail(Email);
    console.log(user);    if (user) {
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.Email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      status: 200,
    };
  }
}
