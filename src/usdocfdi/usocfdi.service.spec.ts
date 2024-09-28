import { Test, TestingModule } from '@nestjs/testing';
import { UsocfdiService } from './usocfdi.service';

describe('UsdocfdiService', () => {
  let service: UsocfdiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsocfdiService],
    }).compile();

    service = module.get<UsocfdiService>(UsocfdiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
