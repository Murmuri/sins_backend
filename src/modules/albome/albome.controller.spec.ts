import { Test, TestingModule } from '@nestjs/testing';
import { AlbomeController } from './albome.controller';

describe('AlbomeController', () => {
  let controller: AlbomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbomeController],
    }).compile();

    controller = module.get<AlbomeController>(AlbomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
