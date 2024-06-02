import { Module } from '@nestjs/common';
import { ServiceB1Service } from './service-b1/service-b1.service';
import { SpecialCalculatorService } from './special-calculator/special-calculator.service';
import { UltraCalculatorService } from './ultra-calculator/ultra-calculator.service';

export const tokenCalculator = Symbol('Calculator');
export const tokenMultiCalculator = Symbol('MultiCalculator');
@Module({
  providers: [
    { provide: tokenCalculator, useClass: ServiceB1Service },
    { provide: tokenMultiCalculator, useClass: SpecialCalculatorService },
    { provide: tokenMultiCalculator, useClass: UltraCalculatorService },
  ],
})
export class ModuleBModule {}
