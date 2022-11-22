import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../utils/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.hashService.compareHash(
      pass,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    const { password, ...userData } = user;

    return userData;
  }

  async login(user: any) {
    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        // In the reality we shouldn't put password hash inside JWT payload
        password: user.password,
      }),
    };
  }
}
