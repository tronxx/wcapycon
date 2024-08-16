import { Test, TestingModule } from '@nestjs/testing';
import { UbivtasController } from './ubivtas.controller';

describe('UbivtasController', () => {
  let controller: UbivtasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbivtasController],
    }).compile();

    controller = module.get<UbivtasController>(UbivtasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
