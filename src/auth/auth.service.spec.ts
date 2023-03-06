import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Should auth user if password and username matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());
    const validated = await service.validateAdmin('admin', '123456');
    expect(validated).toHaveProperty('isAdminMatch', true);
    expect(validated).toHaveProperty('isPassMatch', true);
  });

  it('Should not auth user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin1', '123456');
    expect(validated).toHaveProperty('isAdminMatch', false);
    expect(validated).toHaveProperty('isPassMatch', true);
  });

  it('Should not auth user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin', '1234567');
    expect(validated).toHaveProperty('isAdminMatch', true);
    expect(validated).toHaveProperty('isPassMatch', false);
  });

  it('Should not auth user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('', '123456');
    expect(validated).toHaveProperty('isAdminMatch', false);
    expect(validated).toHaveProperty('isPassMatch', true);
  });

  it('Should not auth user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('admin', '');
    expect(validated).toHaveProperty('isAdminMatch', true);
    expect(validated).toHaveProperty('isPassMatch', false);
  });

  it('Should not auth user if password and username not matched', async () => {
    process.env.ADMIN = await bcrypt.hash('admin', await bcrypt.genSalt());
    process.env.PASSWORD = await bcrypt.hash('123456', await bcrypt.genSalt());

    const validated = await service.validateAdmin('', '');
    expect(validated).toHaveProperty('isAdminMatch', false);
    expect(validated).toHaveProperty('isPassMatch', false);
  });
});
