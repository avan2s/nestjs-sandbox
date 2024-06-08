import { Injectable, Provider } from '@nestjs/common';
import { DiscoverableDecorator, DiscoveryService } from '@nestjs/core';

@Injectable()
export class ServiceDiscoveryService {
  constructor(private readonly discoveryService: DiscoveryService) {}

  public static getProviderInstanceList = <F extends object | never>(
    provider: DiscoverableDecorator<F>,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ): Provider => ({
    provide: provider,
    useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
      return serviceDiscoveryService.getServiceInstances(provider, filterFn);
    },
    inject: [ServiceDiscoveryService],
  });

  public static singleProviderInstance = <F extends object | never>(
    provider: DiscoverableDecorator<F>,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ): Provider => ({
    provide: provider,
    useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
      const instances = serviceDiscoveryService.getServiceInstances(
        provider,
        filterFn,
      );
      if (instances.length === 0) {
        throw Error(`No provider found for ${provider.name}`);
      } else if (instances.length > 1) {
        throw Error(`Multiple providers found for ${provider.name}`);
      } else {
        return instances[0];
      }
    },
    inject: [ServiceDiscoveryService],
  });

  public getServiceInstances<F extends object | never>(
    decorator: DiscoverableDecorator<F>,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ) {
    return this.getProviders(decorator)
      .filter((p) => {
        const serviceParams: F | undefined =
          this.discoveryService.getMetadataByDecorator(decorator, p);

        if (!serviceParams) {
          return filterFn({});
        }
        return filterFn(serviceParams);
      })
      .map((p) => p.instance);
  }

  public getProviders<F>(decorator: DiscoverableDecorator<F>) {
    return this.discoveryService.getProviders({
      metadataKey: decorator.KEY,
    });
  }
}

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
          throw Error(`No provider found for ${provider.name}`);
        } else if (instances.length > 1) {
          throw Error(`Multiple providers found for ${provider.name}`);
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
