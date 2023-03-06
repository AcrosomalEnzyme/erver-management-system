import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
// import { type } from 'os';

export type LocationDocument = HydratedDocument<Location>;

export class LocationPosition {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  coordinates: number[];
}

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  position: LocationPosition;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
