import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';

@Injectable()
export class ExplorerService {
  constructor(private readonly discoveryService: DiscoveryService) {
    const providers = this.discoveryService.getProviders({
      metadataKey: AnimalProvider.KEY,
    });

    console.log(providers.length);
    providers.forEach((provider) => {
      // Register the provider dynamically if needed
      // You can add logic here to register or process the discovered providers
      console.log(`Discovered provider: ${provider.metatype.name}`);
      const x = this.discoveryService.getMetadataByDecorator(
        AnimalProvider,
        provider,
      );
      console.log(x?.name);
    });
  }
}
