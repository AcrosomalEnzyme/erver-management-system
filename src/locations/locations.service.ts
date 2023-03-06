import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { AddOneLocationDto } from './dto/AddOneLocation.dto';
import { GetOneLocationDto } from './dto/GetOneLocation.dto';
import { UpdateOneLocation } from './dto/UpdateOneLocation.dto';
// import { LocationDocument } from './location.schema';
import { Location, LocationDocument } from './location.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  // 增加一个location
  async createOneLocation(addOneLocationDto: AddOneLocationDto) {
    const position = addOneLocationDto.position;
    const name = addOneLocationDto.name;
    const address = addOneLocationDto.address;

    const newLocation = new this.locationModel({
      position,
      name,
      address,
    });
    const res = await newLocation.save();

    return res._id;
  }

  // 获取全部location
  async getAllLocations() {
    const locations = await this.locationModel.find().exec();
    return locations;
  }

  // 查找具体的location，返回location
  private async findOneLocation(locationId: string) {
    let location;
    // console.log(locationId);
    try {
      location = await this.locationModel.findById(locationId).exec();
    } catch (error) {
      throw new NotFoundException(
        'Could not find location.(invalided ID form).',
      );
    }

    if (!location) {
      throw new NotFoundException(
        'Could not find location.(valided ID form but not find).',
      );
    }

    return location;
  }

  // 获取一个location
  async getOneLocation(getOneLocationDto: GetOneLocationDto) {
    const location = await this.findOneLocation(getOneLocationDto.locationId);
    return location;
  }

  // 更新一个location
  async updateOneLocation(
    getOneLocationDto: GetOneLocationDto,
    updateOneLocationDto: UpdateOneLocation,
  ) {
    const locationId = getOneLocationDto.locationId;
    const position = updateOneLocationDto.position;
    const name = updateOneLocationDto.name;
    const address = updateOneLocationDto.address;

    const res = await this.locationModel
      .updateOne(
        { _id: locationId },
        {
          position: position,
          name: name,
          address: address,
        },
      )
      .exec();

    if (!res.matchedCount) {
      throw new NotFoundException(
        'Could not find location.(valided ID form but not find).',
      );
    }

    return null;
  }

  // 删除一个location
  async deleteOneLocation(getOneLocationDto: GetOneLocationDto) {
    const res = await this.locationModel
      .findByIdAndDelete(getOneLocationDto.locationId)
      .exec();

    if (!res) {
      //   console.log('here');
      throw new NotFoundException(
        'Could not find location.(valided ID form but not find).',
      );
    }

    return null;
  }
}
