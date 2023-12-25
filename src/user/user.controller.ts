import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}
  @UseGuards(JwtGuard)
  @Get('all-users')
  getAllUsers() {
    return this.user.getAllUsers();
  }
}
