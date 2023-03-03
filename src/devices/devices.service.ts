import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  // 增加一个device
  async createOneDevice(
    status: string,
    user: string,
    location: string,
    blockInfo: string,
    dockerInfo: string,
  ) {
    // const deviceId = Math.random().toString();
    // const time = new Date().toString();
    const newDevice = new this.deviceModel({
      status,
      user,
      location,
      blockInfo,
      dockerInfo,
    });
    const result = await newDevice.save();

    // console.log(result._id);
    return result._id;
    // return deviceId;
    // return title;
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
    console.log(device);
    console.log(typeof device);
    return device;
  }

  // 获取一个device
  async getOneDevice(deviceId: string) {
    console.log(deviceId);
    const device = await this.findOneDevice(deviceId);
    return device;
  }

  // 更新一个device
  async updateDevice(
    deviceId: string,
    status: string,
    user: string,
    location: string,
    blockInfo: string,
    dockerInfo: string,
  ) {
    // const device = await this.findOneDevice(deviceId);
    const res = await this.deviceModel
      .updateOne(
        { _id: deviceId },
        {
          status: status,
          user: user,
          location: location,
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
  async deleteOneDevice(deviceId: string) {
    const res = await this.deviceModel.findByIdAndDelete(deviceId).exec();

    if (!res) {
      console.log('here');
      throw new NotFoundException(
        'Could not find device.(valided ID form but not find).',
      );
    }

    return null;
  }
}
