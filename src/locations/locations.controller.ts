import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AddOneLocationDto } from './dto/AddOneLocation.dto';
import { GetOneLocationDto } from './dto/GetOneLocation.dto';
import { UpdateOneLocation } from './dto/UpdateOneLocation.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  // 增加一个location
  @Post('addOneLocation')
  async addOneLocation(@Body() addOneLocationDto: AddOneLocationDto) {
    const generatedId = await this.locationService.createOneLocation(
      addOneLocationDto,
    );

    return generatedId;
  }

  // 获取全部location
  @Get('allLocation')
  async getAllLocations() {
    const res = await this.locationService.getAllLocations();

    return res;
  }

  // 获取一个location
  @Get(':locationId')
  async getOneLocation(@Param() getOneLocationDto: GetOneLocationDto) {
    const res = await this.locationService.getOneLocation(getOneLocationDto);
    return res;
  }

  // 更新一个location
  @Patch(':locationId')
  async updateOneLocation(
    @Param() getOneLocationDto: GetOneLocationDto,
    @Body() updateOneLocationDto: UpdateOneLocation,
  ) {
    await this.locationService.updateOneLocation(
      getOneLocationDto,
      updateOneLocationDto,
    );
  }

  // 删除一个location
  @Delete(':locationId')
  async removeLocation(@Param() getOneLocationDto: GetOneLocationDto) {
    await this.locationService.deleteOneLocation(getOneLocationDto);
    return null;
  }
}
