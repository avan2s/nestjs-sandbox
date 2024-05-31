import { Module } from '@nestjs/common';
import { ServiceA1Service } from './services/service-a1/service-a1.service';
import {
  ServiceA2ServiceImpl,
  ServiceA2ServiceImpl2,
  ServiceA2ServiceImpl3,
} from './services/service-a2/service-a2.service';
import { ServiceA2Token } from './interfaces';
import { AbstractServiceA2 } from './abstracts/abstract-service-a2';

@Module({
  providers: [
    ServiceA1Service,
    {
      provide: ServiceA2Token,
      useClass: ServiceA2ServiceImpl,
    },
    {
      provide: AbstractServiceA2,
      useClass: ServiceA2ServiceImpl2,
    },
    {
      provide: AbstractServiceA2,
      useClass: ServiceA2ServiceImpl3,
    },
  ],
})
export class ModuleAModule {}
