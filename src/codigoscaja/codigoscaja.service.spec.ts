import { Test, TestingModule } from '@nestjs/testing';
import { CodigoscajaService } from './codigoscaja.service';

describe('CodigoscajaService', () => {
  let service: CodigoscajaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoscajaService],
    }).compile();

    service = module.get<CodigoscajaService>(CodigoscajaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
