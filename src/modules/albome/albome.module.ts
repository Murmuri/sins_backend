import { Module } from '@nestjs/common';
import { AlbomeService } from './albome.service';

@Module({
  providers: [AlbomeService],
})
export class AlbomeModule {}
