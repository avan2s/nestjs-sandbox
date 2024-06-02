import { Injectable } from '@nestjs/common';
import { Calculator } from '../interfaces';

@Injectable()
export class UltraCalculatorService implements Calculator {
  public add(num1: number, num2: number): number {
    return num1 + num2;
  }
}
