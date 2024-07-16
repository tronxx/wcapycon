import { Test, TestingModule } from '@nestjs/testing';
import { AvalesController } from './avales.controller';

describe('AvalesController', () => {
  let controller: AvalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvalesController],
    }).compile();

    controller = module.get<AvalesController>(AvalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
