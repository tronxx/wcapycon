import { Test, TestingModule } from '@nestjs/testing';
import { RegimenesService } from './regimenes.service';

describe('RegimenesService', () => {
  let service: RegimenesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegimenesService],
    }).compile();

    service = module.get<RegimenesService>(RegimenesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
