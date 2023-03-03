import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema({timestamps:true})
export class Location {
  // 状态、默认ID、区块信息、Docker信息、上次发送状态的时间
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  user: string;

  // @Prop({ required: true })
  // location: string;

  @Prop({ required: true })
  blockInfo: string;

  @Prop({ required: true })
  dockerInfo: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
