import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LocalUser, RequestWithUserLocal } from '../types/user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateAdmin(username: string, pass: string): Promise<string> {
    // const admin = process.env.ADMIN;
    // const password = process.env.PASSWORD;

    // if (process.env.ADMIN || process.env.PASSWORD) {
    //   throw new Error('Admin or password not set');
    // }

    if (!username || !pass) {
      return null;
    }

    const isAdminMatch = await bcrypt.compare(username, process.env.ADMIN);
    const isPassMatch = await bcrypt.compare(pass, process.env.PASSWORD);

    if (isAdminMatch && isPassMatch) {
      // const user = new RequestwithUserLocal();
      return username;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user, sub: user };
    // console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET!,
      }),
    };
  }
}
