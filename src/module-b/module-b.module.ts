import { Module } from '@nestjs/common';
import { ServiceB1Service } from './service-b1/service-b1.service';

@Module({
  providers: [{ provide: ServiceB1Service, useClass: ServiceB1Service }],
})
export class ModuleBModule {}
