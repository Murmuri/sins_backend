import { Module } from '@nestjs/common';
import { TelescopeController } from './telescope.controller';

@Module({
  controllers: [TelescopeController]
})
export class TelescopeModule {}
