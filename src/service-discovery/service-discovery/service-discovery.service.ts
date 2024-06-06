import { Injectable } from '@nestjs/common';
import { DiscoverableDecorator, DiscoveryService } from '@nestjs/core';

@Injectable()
export class ServiceDiscoveryService {
  constructor(private readonly discoveryService: DiscoveryService) {}

  public getServiceInstances<F extends object | never>(
    decorator: DiscoverableDecorator<F>,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ) {
    return this.discoveryService
      .getProviders({
        metadataKey: decorator.KEY,
      })
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
}
