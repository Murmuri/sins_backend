import { Test, TestingModule } from '@nestjs/testing';
import { TelescopeService } from './telescope.service';

describe('TelescopeService', () => {
  let service: TelescopeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelescopeService],
    }).compile();

    service = module.get<TelescopeService>(TelescopeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
