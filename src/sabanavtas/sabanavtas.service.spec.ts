import { Test, TestingModule } from '@nestjs/testing';
import { SabanavtasService } from './sabanavtas.service';

describe('SabanavtasService', () => {
  let service: SabanavtasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SabanavtasService],
    }).compile();

    service = module.get<SabanavtasService>(SabanavtasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
