import { InjectionToken, Provider } from '@nestjs/common';
import { DiscoverableDecorator, DiscoveryService } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

type ExtendedDiscoverableDecorator<T extends object | never> =
  DiscoverableDecorator<T> & {
    TOKEN_LIST: () => InjectionToken;
    forList: (filterFn?: (params: Partial<T>) => boolean) => Provider;
  };

export function createExtendedDecorator<
  T extends object | never,
>(): ExtendedDiscoverableDecorator<T> {
  const decorator =
    DiscoveryService.createDecorator<T>() as ExtendedDiscoverableDecorator<T>;
  decorator.TOKEN_LIST = () => Symbol(`${decorator.KEY}_LIST`);
  decorator.forList = (
    filterFn: (params: Partial<T>) => boolean = () => true,
  ) => ({
    provide: decorator.TOKEN_LIST,
    useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
      return serviceDiscoveryService.getProviderInstances(decorator, filterFn);
    },
    inject: [ServiceDiscoveryService],
  });
  return decorator;
}
