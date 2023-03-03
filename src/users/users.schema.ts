import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({timestamps:true})
export class Device {
  // 状态、默认ID、区块信息、Docker信息、上次发送状态的时间
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  blockInfo: string;

  @Prop({ required: true })
  dockerInfo: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
