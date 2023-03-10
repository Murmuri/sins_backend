import { Module } from '@nestjs/common';
import { AlbomeController } from './albome.controller';
import { AlbomeService } from './albome.service';

@Module({
  imports: [],
  controllers: [AlbomeController],
  providers: [AlbomeService],
})
export class AlbomeModule {}
