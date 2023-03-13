import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../mongoMemoryServer';
import { Device, DeviceSchema } from './device.schema';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Device.name, schema: DeviceSchema },
        ]),
      ],
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  afterEach;

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
