import { Test, TestingModule } from '@nestjs/testing';
import { CodigoscarteraService } from './codigoscartera.service';

describe('CodigoscarteraService', () => {
  let service: CodigoscarteraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoscarteraService],
    }).compile();

    service = module.get<CodigoscarteraService>(CodigoscarteraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
