import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class AddOneLocationPositionDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  coordinates: number[];
}

export class AddOneLocationDto {
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddOneLocationPositionDto)
  position: AddOneLocationPositionDto;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
