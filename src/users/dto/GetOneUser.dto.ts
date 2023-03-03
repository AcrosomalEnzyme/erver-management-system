import { Length, IsString } from 'class-validator';

export class GetOneUserDto {
  @IsString()
  @Length(24, 24, { message: 'ID长度应该为24' })
  userId: string;
}
