import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from '../auth/auth.constant';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { SignupUserDTO } from './dto/signupUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(signupUserDTO: SignupUserDTO) {

    const userExists = await this.findByEmail(signupUserDTO.Email);
    if (userExists) {
      return { status: 409, Message: 'User already exists' };
    }

    const pass = signupUserDTO.Password;
    const hash_pass = await bcrypt.hash(pass, jwtConstants.MY_SALT);
    signupUserDTO.Password = hash_pass;
    return this.userRepository.save(signupUserDTO);
  }

  findByEmail(Email: string) {
    return this.userRepository.findOne({ where: { Email } });
  }
}
