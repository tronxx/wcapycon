import { Test, TestingModule } from '@nestjs/testing';
import { RenpolService } from './renpol.service';

describe('RenpolService', () => {
  let service: RenpolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenpolService],
    }).compile();

    service = module.get<RenpolService>(RenpolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
