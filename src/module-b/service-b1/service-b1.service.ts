import { Injectable } from '@nestjs/common';
import { Calculator } from '../interfaces';

@Injectable()
export class ServiceB1Service implements Calculator {
  public add(num1: number): number {
    return num1;
  }
}
