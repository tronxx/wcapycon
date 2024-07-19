import { Test, TestingModule } from '@nestjs/testing';
import { CartapromController } from './cartaprom.controller';

describe('CartapromController', () => {
  let controller: CartapromController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartapromController],
    }).compile();

    controller = module.get<CartapromController>(CartapromController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
