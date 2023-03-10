import { Module } from '@nestjs/common';
import { TelescopeController } from './telescope.controller';
import { TelescopeService } from './telescope.service';

@Module({
  controllers: [TelescopeController],
  providers: [TelescopeService],
})
export class TelescopeModule {}
