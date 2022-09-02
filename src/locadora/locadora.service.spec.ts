import { Test, TestingModule } from '@nestjs/testing';
import { LocadoraService } from './locadora.service';

describe('LocadoraService', () => {
  let service: LocadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocadoraService],
    }).compile();

    service = module.get<LocadoraService>(LocadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
