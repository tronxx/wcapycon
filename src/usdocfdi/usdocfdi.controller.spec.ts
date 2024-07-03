import { Test, TestingModule } from '@nestjs/testing';
import { UsdocfdiController } from './usdocfdi.controller';

describe('UsdocfdiController', () => {
  let controller: UsdocfdiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsdocfdiController],
    }).compile();

    controller = module.get<UsdocfdiController>(UsdocfdiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
