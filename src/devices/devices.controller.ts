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
import { AddOneDeviceDto } from './dto/AddOneDevice.dto';
import { GetOneDeviceDto } from './dto/GetOneDevice.dto';
import { UpdateOneDevice } from './dto/UpdateOneDevice.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}

  // 增加一个device
  @Post('addOneDevice')
  async addOneDevice(
    @Body() addOneDeviceDto: AddOneDeviceDto,
    @Body('status') status: string,
    @Body('user') user: string,
    @Body('location') location: string,
    @Body('blockInfo') blockInfo: string,
    @Body('dockerInfo') dockerInfo: string,
  ) {
    const generatedId = await this.deviceService.createOneDevice(
      addOneDeviceDto,
    );

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
  async getOneDevice(@Param() getOneDeviceDto: GetOneDeviceDto) {
    const res = await this.deviceService.getOneDevice(getOneDeviceDto);
    return res;
  }

  // 更新一个device
  @Patch(':deviceId')
  async updateOneDevice(
    @Param() getOneDeviceDto: GetOneDeviceDto,
    @Body() updateOneDeviceDto: UpdateOneDevice,
  ) {
    await this.deviceService.updateOneDevice(
      getOneDeviceDto,
      updateOneDeviceDto,
    );
  }

  // 删除一个device
  @Delete(':deviceId')
  async removeDevice(@Param() getOneDeviceDto: GetOneDeviceDto) {
    await this.deviceService.deleteOneDevice(getOneDeviceDto);
    return null;
  }
}
