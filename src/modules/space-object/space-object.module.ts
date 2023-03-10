import { Module } from '@nestjs/common';
import { SpaceObjectController } from './space-object.controller';
import { SpaceObjectService } from './space-object.service';

@Module({
  controllers: [SpaceObjectController],
  providers: [SpaceObjectService],
})
export class SpaceObjectModule {}
