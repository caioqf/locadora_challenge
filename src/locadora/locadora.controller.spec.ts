import { Test, TestingModule } from '@nestjs/testing';
import { LocadoraController } from './locadora.controller';
import { LocadoraService } from './locadora.service';

describe('LocadoraController', () => {
  let controller: LocadoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocadoraController],
      providers: [LocadoraService],
    }).compile();

    controller = module.get<LocadoraController>(LocadoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
