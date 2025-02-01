import { Test, TestingModule } from '@nestjs/testing';
import { CodigoscarteraController } from './codigoscartera.controller';

describe('CodigoscarteraController', () => {
  let controller: CodigoscarteraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigoscarteraController],
    }).compile();

    controller = module.get<CodigoscarteraController>(CodigoscarteraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
