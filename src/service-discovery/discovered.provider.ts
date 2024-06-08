import { Provider } from '@nestjs/common';
import { DiscoverableDecorator } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

export const DisvoceredProvider = {
  single: <F extends object | never>(
    provider: DiscoverableDecorator<F>,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ): Provider => {
    return {
      provide: provider,
      useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
        const instances = serviceDiscoveryService.getServiceInstances(
          provider,
          filterFn,
        );
        if (instances.length === 0) {
          throw Error(`No provider found for token`);
        } else if (instances.length > 1) {
          throw Error(`Multiple providers found`);
        } else {
          return instances[0];
        }
      },
      inject: [ServiceDiscoveryService],
    };
  },

  list: <F extends object | never>(
    provider: DiscoverableDecorator<F>,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ): Provider => ({
    provide: provider,
    useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
      return serviceDiscoveryService.getServiceInstances(provider, filterFn);
    },
    inject: [ServiceDiscoveryService],
  }),
};
