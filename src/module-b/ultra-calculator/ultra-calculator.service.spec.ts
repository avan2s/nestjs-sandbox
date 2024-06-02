import { Test, TestingModule } from '@nestjs/testing';
import { UltraCalculatorService } from './ultra-calculator.service';

describe('UltraCalculatorService', () => {
  let service: UltraCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UltraCalculatorService],
    }).compile();

    service = module.get<UltraCalculatorService>(UltraCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
