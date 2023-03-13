import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { PassportModule } from '@nestjs/passport';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '7d' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    process.env.JWT_SECRET = 'secret';
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // 输入用户名，jwt登录成功，返回token
  it('Should return token if password and username matched', async () => {
    const res = await authController.login({
      user: 'admin',
    });
    expect(res).toHaveProperty('access_token');
  });
});
