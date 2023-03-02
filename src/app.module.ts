import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { DeviceModule } from './device/device.module';


@Module({
  imports: [UsersModule, LocationsModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
