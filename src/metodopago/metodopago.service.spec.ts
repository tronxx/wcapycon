import { Test, TestingModule } from '@nestjs/testing';
import { MetodopagoService } from './metodopago.service';

describe('MetodopagoService', () => {
  let service: MetodopagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetodopagoService],
    }).compile();

    service = module.get<MetodopagoService>(MetodopagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
