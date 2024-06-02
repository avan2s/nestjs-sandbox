import { Test, TestingModule } from '@nestjs/testing';
import { SpecialCalculatorService } from './special-calculator.service';

describe('SpecialCalculatorService', () => {
  let service: SpecialCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialCalculatorService],
    }).compile();

    service = module.get<SpecialCalculatorService>(SpecialCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
