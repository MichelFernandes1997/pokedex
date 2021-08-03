import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userMail: string, userPass: string): Promise<any> {
    const user = await this.usersService.findByMail(userMail);

    if (user && user.password === userPass) {
      const { _id, mail, nickname } = user;

      return { _id, mail, nickname };
    }

    return null;
  }

  async login(user: any) {
    const payload = { mail: user.mail, sub: user._id, nickname: user.nickname };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
