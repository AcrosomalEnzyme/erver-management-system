import { Length, IsString } from 'class-validator';

export class GetOneDeviceDto {
  @IsString()
  @Length(24, 24, { message: 'ID长度应该为24' })
  deviceId: string;

  constructor(deviceId: string) {
    this.deviceId = deviceId;
  }
}
