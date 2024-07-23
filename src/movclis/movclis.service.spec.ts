import { Test, TestingModule } from '@nestjs/testing';
import { MovclisService } from './movclis.service';

describe('MovclisService', () => {
  let service: MovclisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovclisService],
    }).compile();

    service = module.get<MovclisService>(MovclisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
