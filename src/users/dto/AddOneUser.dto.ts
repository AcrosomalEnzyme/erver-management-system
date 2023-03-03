import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddOneUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(24, 24, { message: 'ID长度应该为24' })
  locationId: string;
}
