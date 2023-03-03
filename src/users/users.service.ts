import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { AddOneUserDto } from './dto/AddOneUser.dto';
import { GetOneUserDto } from './dto/GetOneUser.dto';
import { UpdateOneUser } from './dto/UpdateOneUser.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 增加一个user
  async createOneUser(addOneUserDto: AddOneUserDto) {
    const locationId = addOneUserDto.locationId;
    const name = addOneUserDto.name;

    const newUser = new this.userModel({
      name,
      locationId,
    });
    const res = await newUser.save();

    return res._id;
  }

  // 获取全部user
  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users;
  }

  // 查找具体的user，返回user
  private async findOneUser(userId: string) {
    let user;
    // console.log(userId);
    try {
      user = await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.(invalided ID form).');
    }

    if (!user) {
      throw new NotFoundException(
        'Could not find user.(valided ID form but not find).',
      );
    }

    return user;
  }

  // 获取一个user
  async getOneUser(getOneUserDto: GetOneUserDto) {
    const user = await this.findOneUser(getOneUserDto.userId);
    return user;
  }

  // 更新一个user
  async updateOneUser(
    getOneUserDto: GetOneUserDto,
    updateOneUserDto: UpdateOneUser,
  ) {
    const userId = getOneUserDto.userId;
    const location = updateOneUserDto.locationId;
    const name = updateOneUserDto.name;

    const res = await this.userModel
      .updateOne(
        { _id: userId },
        {
          name: name,
          location: location,
        },
      )
      .exec();

    if (!res.matchedCount) {
      throw new NotFoundException(
        'Could not find user.(valided ID form but not find).',
      );
    }

    return null;
  }

  // 删除一个user
  async deleteOneUser(getOneUserDto: GetOneUserDto) {
    const res = await this.userModel
      .findByIdAndDelete(getOneUserDto.userId)
      .exec();

    if (!res) {
      //   console.log('here');
      throw new NotFoundException(
        'Could not find user.(valided ID form but not find).',
      );
    }

    return null;
  }
}
