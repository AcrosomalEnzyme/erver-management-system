import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        JwtModule.register({
          // secret: process.env.JWT_SECRET,
          secret: 'secret',
          signOptions: { expiresIn: '7d' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // 输入正确的用户名和密码，登录成功，返回用户
  it('Should return user if password and username matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());
    const validated = await service.validateAdmin('admin', '123456');
    expect(validated).toEqual('admin');
  });

  // 输入错误的用户名，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin1', '123456');
    expect(validated).toBe(null);
  });

  // 输入错误的密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin', '1234567');
    expect(validated).toBe(null);
  });

  // 输入空的用户名，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('', '123456');
    expect(validated).toBe(null);
  });

  // 输入空的密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin', '');
    expect(validated).toBe(null);
  });

  // 输入空的用户名和密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('', '');
    expect(validated).toBe(null);
  });

  // 设置空的的用户名和密码，输入空的用户名和密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('', await bcrypt.genSalt());

    const validated = await service.validateAdmin('', '');
    expect(validated).toBe(null);
  });

  // 设置空的的用户名和密码，输入用户名和空的密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin', '');
    expect(validated).toBe(null);
  });

  // 设置空的的用户名和密码，输入用户名和空的密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('', await bcrypt.genSalt());

    const validated = await service.validateAdmin('', '12345');
    expect(validated).toBe(null);
  });

  // 设置空的的用户名和密码，输入用户名和密码，登录失败，返回null
  it('Should not return user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin', '12345');
    expect(validated).toBe(null);
  });

  // 输入用户名，jwt登录成功，应当返回不空的token
  it('Should return token', async () => {
    const token = await service.login({
      username: 'admin',
    });
    expect(token).toHaveProperty('access_token');
    expect(token.access_token).not.toBeNull();
  });

  // 输入空的用户名，jwt登录失败，应当返回空的token
  it('Should return token', async () => {
    const token = await service.login({
      username: '',
    });
    expect(token).toHaveProperty('access_token');
    expect(token.access_token).not.toBeNull();
  });
});
