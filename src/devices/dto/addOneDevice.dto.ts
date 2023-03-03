import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddOneDeviceDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  @Length(24, 24, { message: 'ID长度应该为24' })
  userId: string;

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
