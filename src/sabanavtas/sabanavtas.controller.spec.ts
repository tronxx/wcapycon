import { Test, TestingModule } from '@nestjs/testing';
import { SabanavtasController } from './sabanavtas.controller';

describe('SabanavtasController', () => {
  let controller: SabanavtasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SabanavtasController],
    }).compile();

    controller = module.get<SabanavtasController>(SabanavtasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
