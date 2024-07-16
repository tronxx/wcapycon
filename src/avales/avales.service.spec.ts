import { Test, TestingModule } from '@nestjs/testing';
import { AvalesService } from './avales.service';

describe('AvalesService', () => {
  let service: AvalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvalesService],
    }).compile();

    service = module.get<AvalesService>(AvalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
