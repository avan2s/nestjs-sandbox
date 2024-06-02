import { Inject, Injectable } from '@nestjs/common';
import { AbstractServiceA2 } from 'src/module-a/abstracts/abstract-service-a2';
import { ServiceA2, ServiceA2Token } from 'src/module-a/interfaces';

@Injectable()
export class ServiceA1Service {
  constructor(
    @Inject(ServiceA2Token) private readonly serviceA2: ServiceA2,
    private readonly abstractServiceA2: AbstractServiceA2,
  ) {
    console.log(this.serviceA2.method1({ age: 20, name: 'Peter' }));
    console.log(abstractServiceA2.abstractMethod1(2));
  }

  public bar() {
    this.abstractServiceA2;
    const foo = { foo: 'fodo', i: 10 } as const;
    this.serviceA2.method2({ foo: foo.foo });
    this.serviceA2.method2({ ...foo });
    this.serviceA2.method2(foo);
  }
}
