import { Inject, Injectable } from '@nestjs/common';
import { AbstractServiceA2 } from 'src/module-a/abstracts/abstract-service-a2';
import { ServiceA2, ServiceA2Token } from 'src/module-a/interfaces';
import { Person } from 'src/module-a/types';

@Injectable()
export class ServiceA1Service {
  constructor(
    @Inject(ServiceA2Token) private readonly serviceA2: ServiceA2,
    private readonly abstractServiceA2: AbstractServiceA2,
    @Inject('Person') person: Person,
    @Inject('Persons') persons: Person[],
  ) {
    console.log(this.serviceA2);
    console.log(abstractServiceA2);
    console.log(person);
    console.log(persons);
  }

  public bar() {
    this.abstractServiceA2;
    const foo = { foo: 'fodo', i: 10 } as const;
    this.serviceA2.method2({ foo: foo.foo });
    this.serviceA2.method2({ ...foo });
    this.serviceA2.method2(foo);
  }
}
