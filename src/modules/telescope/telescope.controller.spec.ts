import { Test, TestingModule } from '@nestjs/testing';
import { TelescopeController } from './telescope.controller';

describe('TelescopeController', () => {
  let controller: TelescopeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelescopeController],
    }).compile();

    controller = module.get<TelescopeController>(TelescopeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
