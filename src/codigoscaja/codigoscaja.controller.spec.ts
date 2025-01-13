import { Test, TestingModule } from '@nestjs/testing';
import { CodigosscajaController } from './codigoscaja.controller';

describe('CodigosscajaController', () => {
  let controller: CodigosscajaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigosscajaController],
    }).compile();

    controller = module.get<CodigosscajaController>(CodigosscajaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
