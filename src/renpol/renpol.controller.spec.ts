import { Test, TestingModule } from '@nestjs/testing';
import { RenpolController } from './renpol.controller';

describe('RenpolController', () => {
  let controller: RenpolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenpolController],
    }).compile();

    controller = module.get<RenpolController>(RenpolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
