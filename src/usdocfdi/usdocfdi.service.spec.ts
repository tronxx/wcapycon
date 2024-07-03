import { Test, TestingModule } from '@nestjs/testing';
import { UsdocfdiService } from './usdocfdi.service';

describe('UsdocfdiService', () => {
  let service: UsdocfdiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsdocfdiService],
    }).compile();

    service = module.get<UsdocfdiService>(UsdocfdiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
