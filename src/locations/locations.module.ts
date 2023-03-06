import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { LocationSchema } from './location.schema';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Location,LocationSchema } from './location.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Location.name, schema: LocationSchema}])],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
