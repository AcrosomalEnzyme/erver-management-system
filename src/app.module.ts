import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { DeviceModule } from './device/device.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    LocationsModule,
    DeviceModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
