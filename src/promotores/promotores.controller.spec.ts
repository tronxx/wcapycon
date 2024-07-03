import { Test, TestingModule } from '@nestjs/testing';
import { PromotoresController } from './promotores.controller';

describe('PromotoresController', () => {
  let controller: PromotoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotoresController],
    }).compile();

    controller = module.get<PromotoresController>(PromotoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
