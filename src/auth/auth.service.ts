import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    // const admin = process.env.ADMIN;
    // const password = process.env.PASSWORD;
    const isAdminMatch = await bcrypt.compare(username, process.env.ADMIN);
    const isPassMatch = await bcrypt.compare(pass, process.env.PASSWORD);

    if (isAdminMatch && isPassMatch) {
      return username;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
