import { Module } from '@nestjs/common';
import { CameraController } from './camera.controller';
import { CameraService } from './camera.service';

@Module({
  controllers: [CameraController],
  providers: [CameraService]
})
export class CameraModule {}
