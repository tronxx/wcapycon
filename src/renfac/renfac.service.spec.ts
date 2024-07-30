import { Test, TestingModule } from '@nestjs/testing';
import { RenfacService } from './renfac.service';

describe('RenfacService', () => {
  let service: RenfacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenfacService],
    }).compile();

    service = module.get<RenfacService>(RenfacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
