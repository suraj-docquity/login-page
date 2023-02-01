import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignupUserDTO } from './dto/signupUser.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  async store(@Body() signupUserDTO: SignupUserDTO) {
    return this.userService.createUser(signupUserDTO);
  }

}
