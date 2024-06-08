import { InjectionToken, Provider } from '@nestjs/common';
import { DiscoverableDecorator, DiscoveryService } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

type ExtendedDiscoverableDecorator<T> = DiscoverableDecorator<T> & {
  TOKEN_LIST: () => InjectionToken;

  forList: <F extends object | never>(
    filterFn?: (params: Partial<F>) => boolean,
  ) => Provider;
};

export function createExtendedDecorator<T>(
  abstractName: string,
): ExtendedDiscoverableDecorator<T> {
  const baseDecorator = DiscoveryService.createDecorator<
    T & { _abstractName: string }
  >() as ExtendedDiscoverableDecorator<T>;
  baseDecorator.TOKEN_LIST = () => Symbol(`${abstractName}_LIST`);

  baseDecorator.forList = <F extends object | never>(
    filterFn?: (params: Partial<F>) => boolean,
  ) => ({
    provide: baseDecorator.TOKEN_LIST,
    useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
      return serviceDiscoveryService.getProviderInstances(
        baseDecorator as DiscoverableDecorator<F>,
        filterFn,
      );
    },
    inject: [ServiceDiscoveryService],
  });
  return baseDecorator;
}
