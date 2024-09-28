import { Test, TestingModule } from '@nestjs/testing';
import { UsocfdiController } from  '../usdocfdi/usocfdi.controller';

describe('UsdocfdiController', () => {
  let controller: UsocfdiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsocfdiController],
    }).compile();

    controller = module.get<UsocfdiController>(UsocfdiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
