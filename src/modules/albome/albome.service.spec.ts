import { Test, TestingModule } from '@nestjs/testing';
import { AlbomeService } from './albome.service';

describe('AlbomeService', () => {
  let service: AlbomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbomeService],
    }).compile();

    service = module.get<AlbomeService>(AlbomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
