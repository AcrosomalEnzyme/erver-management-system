import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RequestWithUserLocal } from 'src/types/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<string> {
    const user = await this.authService.validateAdmin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    // console.log('user: ', user);
    // console.log('typeof user: ', typeof user);
    return user;
  }
}
