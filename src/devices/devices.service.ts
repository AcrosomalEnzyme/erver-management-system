import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';
import { AddOneDeviceDto } from './dto/AddOneDevice.dto';
import { GetOneDeviceDto } from './dto/GetOneDevice.dto';
import { UpdateOneDevice } from './dto/UpdateOneDevice.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  // 增加一个device
  async createOneDevice(addOneDeviceDto: AddOneDeviceDto) {
    const status = addOneDeviceDto.status;
    const userId = addOneDeviceDto.userId;
    // const location = addOneDeviceDto.location;
    const blockInfo = addOneDeviceDto.blockInfo;
    const dockerInfo = addOneDeviceDto.blockInfo;

    const newDevice = new this.deviceModel({
      status,
      userId,
      // location,
      blockInfo,
      dockerInfo,
    });
    const res = await newDevice.save();

    return res._id;
  }

  // 获取全部device
  async getAllDevices() {
    const devices = await this.deviceModel.find().exec();
    // console.log(devices[1].id);
    return devices;
  }

  // 查找具体的device，返回device
  private async findOneDevice(deviceId: string) {
    let device;
    // console.log(deviceId);
    try {
      device = await this.deviceModel.findById(deviceId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find device.(invalided ID form).');
    }

    if (!device) {
      throw new NotFoundException(
        'Could not find device.(valided ID form but not find).',
      );
    }
    // console.log(device);
    // console.log(typeof device);
    return device;
  }

  // 获取一个device
  async getOneDevice(getOneDeviceDto: GetOneDeviceDto) {
    const device = await this.findOneDevice(getOneDeviceDto.deviceId);
    return device;
  }

  // 更新一个device
  async updateOneDevice(
    getOneDeviceDto: GetOneDeviceDto,
    updateOneDeviceDto: UpdateOneDevice,
  ) {
    const deviceId = getOneDeviceDto.deviceId;
    const status = updateOneDeviceDto.status;
    const userId = updateOneDeviceDto.userId;
    // const location = updateOneDeviceDto.location;
    const blockInfo = updateOneDeviceDto.blockInfo;
    const dockerInfo = updateOneDeviceDto.blockInfo;

    const res = await this.deviceModel
      .updateOne(
        { _id: deviceId },
        {
          status: status,
          userId: userId,
          // location: location,
          blockInfo: blockInfo,
          dockerInfo: dockerInfo,
        },
      )
      .exec();

    if (!res.matchedCount) {
      throw new NotFoundException(
        'Could not find device.(valided ID form but not find).',
      );
    }

    return null;
  }

  // 删除一个device
  async deleteOneDevice(getOneDeviceDto: GetOneDeviceDto) {
    const res = await this.deviceModel
      .findByIdAndDelete(getOneDeviceDto.deviceId)
      .exec();

    if (!res) {
      // console.log('here');
      throw new NotFoundException(
        'Could not find device.(valided ID form but not find).',
      );
    }

    return null;
  }
}
