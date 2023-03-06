import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  async getHello() {
    console.log(process.env.ADMIN);
    const salt = await bcrypt.genSalt();
    const cipher_password = await bcrypt.hash('123', salt);

    const isMatch = await bcrypt.compare('123', process.env.PASSWORD);
    console.log(isMatch);

    return cipher_password;
  }
}
