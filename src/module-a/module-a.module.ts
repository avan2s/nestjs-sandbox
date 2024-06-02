import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  tokenCalculator,
  tokenMultiCalculator,
} from 'src/module-b/module-b.module';
import { AbstractServiceA2 } from './abstracts/abstract-service-a2';
import { ServiceA2Token } from './interfaces';
import { ServiceA1Service } from './services/service-a1/service-a1.service';
import {
  ServiceA2ServiceImpl,
  ServiceA2ServiceImpl2,
  ServiceA2ServiceImpl3,
} from './services/service-a2/service-a2.service';
import { Person } from './types';
import { Calculator } from 'src/module-b/interfaces';
import { ModulaAcalculatorService } from './services/modula-acalculator/modula-acalculator.service';

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
    {
      provide: 'Person',
      useFactory() {
        return { age: 20, name: 'bar' } satisfies Person;
      },
    },
    {
      provide: tokenMultiCalculator,
      useClass: ModulaAcalculatorService,
    },
    {
      provide: 'Persons',
      useFactory(moduleRef: ModuleRef) {
        const abstr = moduleRef.get(AbstractServiceA2);
        const calcultorFromOtherModule = moduleRef.get<Calculator>(
          tokenCalculator,
          {
            strict: false,
          },
        );
        const result = abstr.abstractMethod1(
          calcultorFromOtherModule.add(2, 3),
        );

        const specificCalculators = moduleRef.get<Calculator>(
          tokenMultiCalculator,
          {
            each: true,
            strict: false,
          },
        );
        console.log(specificCalculators[0].constructor.name);
        console.log(specificCalculators[1].constructor.name);

        return result;
      },
      inject: [ModuleRef],
    },
  ],
})
export class ModuleAModule {}
