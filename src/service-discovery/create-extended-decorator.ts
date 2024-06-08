import { Provider } from '@nestjs/common';
import { DiscoverableDecorator, DiscoveryService } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

type ExtendedDiscoverableDecorator<T> = DiscoverableDecorator<T> & {
  TOKEN_LIST: () => string;

  listProvider: <F extends object | never>(
    filterFn?: (params: Partial<F>) => boolean,
  ) => Provider;
};

export function createExtendedDecorator<T>(
  name: string,
): ExtendedDiscoverableDecorator<T> {
  const baseDecorator = DiscoveryService.createDecorator<
    T & { name: string }
  >() as ExtendedDiscoverableDecorator<T>;
  baseDecorator.TOKEN_LIST = () => `${name}_LIST`;

  baseDecorator.listProvider = <F extends object | never>(
    filterFn?: (params: Partial<F>) => boolean,
  ) => ({
    provide: baseDecorator,
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
