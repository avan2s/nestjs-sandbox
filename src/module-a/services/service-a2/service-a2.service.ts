import { Injectable } from '@nestjs/common';
import { AbstractServiceA2 } from 'src/module-a/abstracts/abstract-service-a2';
import { ServiceA2 } from 'src/module-a/interfaces/service-a2.interface';
import { SuperAgent } from 'src/module-a/types';
import { Person } from 'src/module-a/types/person.type';

@Injectable()
export class ServiceA2ServiceImpl implements ServiceA2 {
  public method1(person: Person): Person {
    const agent: SuperAgent = {
      ...person,
      agentNumber: 7,
    };
    return agent;
  }

  public method2(params: { foo: string }): void {
    console.log(params);
  }
}

@Injectable()
export class ServiceA2ServiceImpl2 implements AbstractServiceA2 {
  public abstractMethod1(num: number): Person[] {
    return [{ age: num, name: 'foo' }];
  }
}

@Injectable()
export class ServiceA2ServiceImpl3 implements AbstractServiceA2 {
  public abstractMethod1(num: number): Person[] {
    return [{ age: num, name: 'foo' }];
  }
}
