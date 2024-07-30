import { Test, TestingModule } from '@nestjs/testing';
import { RenfacController } from './renfac.controller';

describe('RenfacController', () => {
  let controller: RenfacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenfacController],
    }).compile();

    controller = module.get<RenfacController>(RenfacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
