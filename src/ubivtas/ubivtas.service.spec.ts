import { Test, TestingModule } from '@nestjs/testing';
import { UbivtasService } from './ubivtas.service';

describe('UbivtasService', () => {
  let service: UbivtasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbivtasService],
    }).compile();

    service = module.get<UbivtasService>(UbivtasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
