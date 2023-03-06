import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { AddOneUserDto } from './dto/AddOneUser.dto';
  import { GetOneUserDto } from './dto/GetOneUser.dto';
  import { UpdateOneUser } from './dto/UpdateOneUser.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    // 增加一个user
    @Post('addOneUser')
    async addOneUser(
      @Body() addOneUserDto: AddOneUserDto,
      // @Body('status') status: string,
      // @Body('user') user: string,
      // @Body('location') location: string,
      // @Body('blockInfo') blockInfo: string,
      // @Body('dockerInfo') dockerInfo: string,
    ) {
      const generatedId = await this.userService.createOneUser(
        addOneUserDto,
      );
  
      return generatedId;
    }
  
    // 获取全部user
    @Get('allUser')
    async getAllUsers() {
      const res = await this.userService.getAllUsers();
      // console.log(res);
      return res;
    }
  
    // 获取一个user
    @Get(':userId')
    async getOneUser(@Param() getOneUserDto: GetOneUserDto) {
      const res = await this.userService.getOneUser(getOneUserDto);
      return res;
    }
  
    // 更新一个user
    @Patch(':userId')
    async updateOneUser(
      @Param() getOneUserDto: GetOneUserDto,
      @Body() updateOneUserDto: UpdateOneUser,
    ) {
      await this.userService.updateOneUser(
        getOneUserDto,
        updateOneUserDto,
      );
    }
  
    // 删除一个user
    @Delete(':userId')
    async removeUser(@Param() getOneUserDto: GetOneUserDto) {
      await this.userService.deleteOneUser(getOneUserDto);
      return null;
    }
  }
  