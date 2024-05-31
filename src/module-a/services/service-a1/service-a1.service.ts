import { Inject, Injectable } from '@nestjs/common';
import { AbstractServiceA2 } from 'src/module-a/abstracts/abstract-service-a2';
import { ServiceA2, ServiceA2Token } from 'src/module-a/interfaces';

@Injectable()
export class ServiceA1Service {
  constructor(
    @Inject(ServiceA2Token) private readonly serviceA2: ServiceA2,
    private readonly serviceA2Abstract: AbstractServiceA2,
    @Inject(AbstractServiceA2) private readonly services: AbstractServiceA2[],
  ) {
    console.log(this.serviceA2.method1({ age: 20, name: 'Peter' }));
    console.log(this.serviceA2Abstract.constructor.name); //c
    console.log(this.serviceA2Abstract.abstractMethod1(20));
    console.log(services.length);
  }

  public bar() {
    const foo = { foo: 'fodo', i: 10 } as const;
    this.serviceA2.method2({ foo: foo.foo });
    this.serviceA2.method2({ ...foo });
    this.serviceA2.method2(foo);
  }
}
