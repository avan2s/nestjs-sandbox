import { Module } from '@nestjs/common';
import { ServiceB1Service } from './service-b1/service-b1.service';

export const tokenCalculator = Symbol('Calculator');
@Module({
  providers: [{ provide: tokenCalculator, useClass: ServiceB1Service }],
})
export class ModuleBModule {}
