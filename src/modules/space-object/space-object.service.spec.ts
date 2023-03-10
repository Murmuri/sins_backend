import { Test, TestingModule } from '@nestjs/testing';
import { SpaceObjectService } from './space-object.service';

describe('SpaceObjectService', () => {
  let service: ObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceObjectService],
    }).compile();

    service = module.get<SpaceObjectService>(SpaceObjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
