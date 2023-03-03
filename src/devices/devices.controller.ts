import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}

  // 增加一个device
  @Post('addOneDevice')
  async addOneDevice(
    // @Body() addBlogDto: AddBlogDto,
    @Body('status') status: string,
    @Body('user') user: string,
    @Body('location') location: string,
    @Body('blockInfo') blockInfo: string,
    @Body('dockerInfo') dockerInfo: string,
  ) {
    const generatedId = await this.deviceService.createOneDevice(
      status,
      user,
      location,
      blockInfo,
      dockerInfo,
    );

    // console.log(generatedId);
    // console.log(typeof generatedId);
    // return { id: generatedId };
    return generatedId;
  }

  // 获取全部device
  @Get('allDevice')
  async getAllDevices() {
    const res = await this.deviceService.getAllDevices();
    // console.log(res);
    return res;
  }

  // 获取一个device
  @Get(':deviceId')
  async getOneDevice(@Param('deviceId') deviceId: string) {
    const res = await this.deviceService.getOneDevice(deviceId);
    return res;
  }

  // 更新一个device
  @Patch(':deviceId')
  async updateOneDevice(
    @Param('deviceId') deviceId: string,
    @Body('status') status: string,
    @Body('user') user: string,
    @Body('location') location: string,
    @Body('blockInfo') blockInfo: string,
    @Body('dockerInfo') dockerInfo: string,
  ) {
    await this.deviceService.updateDevice(
      deviceId,
      status,
      user,
      location,
      blockInfo,
      dockerInfo,
    );
  }

  // 删除一个device
  @Delete(':deviceId')
  async removeDevice(@Param('deviceId') deviceId: string) {
    // console.log(deviceId);
    await this.deviceService.deleteOneDevice(deviceId);
    return null;
  }
}
