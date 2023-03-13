import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesService } from './devices.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../mongoMemoryServer';
import { Device, DeviceSchema } from './device.schema';
import { AddOneDeviceDto } from './dto/AddOneDevice.dto';
import { GetOneDeviceDto } from './dto/GetOneDevice.dto';

describe('DevicesService', () => {
  let devicesService: DevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Device.name, schema: DeviceSchema },
        ]),
      ],
      providers: [DevicesService],
    }).compile();

    devicesService = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(devicesService).toBeDefined();
  });

  // 测试获取所有的device
  it('should return an array of devices when get all devices', async () => {
    const res0 = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });
    const res1 = await devicesService.addOneDevice({
      status: 'test1',
      userId: '64096abdfe71564f9bb985_1',
      blockInfo: 'test1',
      dockerInfo: 'test1',
    });
    const res2 = await devicesService.addOneDevice({
      status: 'test2',
      userId: '64096abdfe71564f9bb985_2',
      blockInfo: 'test2',
      dockerInfo: 'test2',
    });
    const res3 = await devicesService.addOneDevice({
      status: 'test3',
      userId: '64096abdfe71564f9bb985_3',
      blockInfo: 'test3',
      dockerInfo: 'test3',
    });
    const res4 = await devicesService.addOneDevice({
      status: 'test4',
      userId: '64096abdfe71564f9bb985_4',
      blockInfo: 'test4',
      dockerInfo: 'test4',
    });

    const result = await devicesService.getAllDevices();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(5);
    expect(result[0].status).toBe('test0');
    expect(result[1].status).toBe('test1');
    expect(result[2].status).toBe('test2');
    expect(result[3].status).toBe('test3');
    expect(result[4].status).toBe('test4');
    expect(result[0].userId).toBe('64096abdfe71564f9bb985_0');
    expect(result[1].userId).toBe('64096abdfe71564f9bb985_1');
    expect(result[2].userId).toBe('64096abdfe71564f9bb985_2');
    expect(result[3].userId).toBe('64096abdfe71564f9bb985_3');
    expect(result[4].userId).toBe('64096abdfe71564f9bb985_4');
    expect(result[0].blockInfo).toBe('test0');
    expect(result[1].blockInfo).toBe('test1');
    expect(result[2].blockInfo).toBe('test2');
    expect(result[3].blockInfo).toBe('test3');
    expect(result[4].blockInfo).toBe('test4');
    expect(result[0].dockerInfo).toBe('test0');
    expect(result[1].dockerInfo).toBe('test1');
    expect(result[2].dockerInfo).toBe('test2');
    expect(result[3].dockerInfo).toBe('test3');
    expect(result[4].dockerInfo).toBe('test4');
  });

  // 测试获取一个device，使用正确的输入，期望返回一个device
  it('should return an device ID when create a new device successfully', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });

    const testId = testDevice._id.toString();

    const result = await devicesService.getOneDevice({
      deviceId: testId,
    });
    expect(result).toBeInstanceOf(Object);
    expect(result.status).toBe('test0');
    expect(result.userId).toBe('64096abdfe71564f9bb985_0');
    expect(result.blockInfo).toBe('test0');
    expect(result.dockerInfo).toBe('test0');
  });

  // 测试获取一个device，使用空的ID输入，期望返回一个错误，错误信息为invalided ID form
  it('should return an invalided ID form error with empty ID when get one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });

    const testId = '';

    expect(
      devicesService.getOneDevice({
        deviceId: testId,
      }),
    ).rejects.toThrowError('Could not find device.(invalided ID form).');
  });

  // 测试获取一个device，使用错误的ID格式输入，期望返回一个错误，错误信息为invalided ID form
  it('should throw an (invalided ID form error with invalid ID) error when get one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });

    const testId = 'test';

    expect(
      devicesService.getOneDevice({
        deviceId: testId,
      }),
    ).rejects.toThrowError('Could not find device.(invalided ID form).');
  });

  // 测试获取一个device，使用正确的ID格式但是不存在的ID输入，期望返回一个错误，错误信息为valided ID form but not find
  it('should throw (valided ID form but not find) error with invalid ID when get one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });

    const testId = '60b1e4b7d4b3f4a8c2d9d9e7';

    expect(
      devicesService.getOneDevice({
        deviceId: testId,
      }),
    ).rejects.toThrowError(
      'Could not find device.(valided ID form but not find).',
    );
  });

  // 测试更新一个device，使用正确的输入，期望返回null
  it('should return null when update a device successfully', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });

    const testId = testDevice._id.toString();

    const result = await devicesService.updateOneDevice(
      {
        deviceId: testId,
      },
      {
        status: 'test1',
        userId: '64096abdfe71564f9bb985_1',
        blockInfo: 'test1',
        dockerInfo: 'test1',
      },
    );

    expect(result).toBeNull();
  });

  // 测试更新一个device，使用正确格式但不存在的ID输入，期望返回一个错误，错误信息为valided ID form but not find
  it('should throw (Could not find device.(valided ID form but not find)) error withinvalid ID when update one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });
    const testId = '60b1e4b7d4b3f4a8c2d9d9e7';

    expect(
      devicesService.updateOneDevice(
        {
          deviceId: testId,
        },
        {
          status: 'test1',
          userId: '64096abdfe71564f9bb985_1',
          blockInfo: 'test1',
          dockerInfo: 'test1',
        },
      ),
    ).rejects.toThrowError(
      'Could not find device. (valided ID form but not find).',
    );
  });

  // 测试删除一个device，使用正确的输入，期望返回null
  it('should return null and get 0 device after deleting one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });
    const testId = testDevice._id.toString();

    expect(
      await devicesService.deleteOneDevice({
        deviceId: testId,
      }),
    ).toBeNull();
  });

  // 测试删除一个device，使用正确格式但不存在的ID输入，期望返回一个错误，错误信息为valided ID form but not find
  it('should throw (Could not find device.(valided ID form but not find)) error withinvalid ID when delete one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });
    const testId = '60b1e4b7d4b3f4a8c2d9d9e7';

    expect(
      devicesService.deleteOneDevice({
        deviceId: testId,
      }),
    ).rejects.toThrowError(
      'Could not find device.(valided ID form but not find).',
    );
  });

  // 测试删除一个device，使用错误格式的ID输入，期望返回一个错误，错误信息为invalided ID form
  it('should throw (Could not find device.(valided ID form but not find)) error withinvalid ID when delete one device', async () => {
    const testDevice = await devicesService.addOneDevice({
      status: 'test0',
      userId: '64096abdfe71564f9bb985_0',
      blockInfo: 'test0',
      dockerInfo: 'test0',
    });
    const testId = '';

    expect(
      devicesService.deleteOneDevice({
        deviceId: testId,
      }),
    ).rejects.toThrowError(
      'Could not find device.(valided ID form but not find).',
    );
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
