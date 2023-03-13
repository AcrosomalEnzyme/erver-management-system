import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  SetMetadata,
} from '@nestjs/common';
import { RequestWithUserLocal } from '../types/user';
// import { Public } from './auth.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { UsersService } from 'src/users/users.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  // constructor(private readonly userService: UsersService) {}
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  async login(@Request() req) {
    console.log"req.user: "', req.user);
    // console.log(process.env.JWTCONSTANTS);
    // console.log(req.user);
    // console.log(typeof req.user);
    // console.log('req ', req);
    return this.authService.login(req.user);
  }

  // for test
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
