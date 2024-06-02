import { Test, TestingModule } from '@nestjs/testing';
import { ModulaAcalculatorService } from './modula-acalculator.service';

describe('ModulaAcalculatorService', () => {
  let service: ModulaAcalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulaAcalculatorService],
    }).compile();

    service = module.get<ModulaAcalculatorService>(ModulaAcalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
