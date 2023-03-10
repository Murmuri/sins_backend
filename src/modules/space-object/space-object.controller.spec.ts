import { Test, TestingModule } from '@nestjs/testing';
import { SpaceObjectController } from './space-object.controller';

describe('SpaceObjectController', () => {
  let controller: SpaceObjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceObjectController],
    }).compile();

    controller = module.get<SpaceObjectController>(SpaceObjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
