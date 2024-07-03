import { Test, TestingModule } from '@nestjs/testing';
import { RegimenesController } from './regimenes.controller';

describe('RegimenesController', () => {
  let controller: RegimenesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegimenesController],
    }).compile();

    controller = module.get<RegimenesController>(RegimenesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
