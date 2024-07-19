import { Test, TestingModule } from '@nestjs/testing';
import { CartapromService } from './cartaprom.service';

describe('CartapromService', () => {
  let service: CartapromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartapromService],
    }).compile();

    service = module.get<CartapromService>(CartapromService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
