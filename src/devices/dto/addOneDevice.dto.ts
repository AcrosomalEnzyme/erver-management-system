import { IsNotEmpty, IsString } from 'class-validator';

export class AddOneDeviceDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  // @IsString()
  // @IsNotEmpty()
  // location: string;

  @IsString()
  @IsNotEmpty()
  blockInfo: string;

  @IsString()
  @IsNotEmpty()
  dockerInfo: string;
}
