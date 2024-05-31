import { Person } from '../types/person.type';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const ServiceA2Token = Symbol('ServiceA2');
export interface ServiceA2 {
  method1(person: Person): Person;
  method2(params: { foo: string }): void;
}
