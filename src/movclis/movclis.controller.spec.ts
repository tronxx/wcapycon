import { Test, TestingModule } from '@nestjs/testing';
import { MovclisController } from './movclis.controller';

describe('MovclisController', () => {
  let controller: MovclisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovclisController],
    }).compile();

    controller = module.get<MovclisController>(MovclisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
