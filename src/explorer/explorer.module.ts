import { Module } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { ExplorerService } from './explorer.service';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';

@Module({
  imports: [DiscoveryModule],
  providers: [
    ExplorerService,
    {
      provide: AnimalProvider,
      useFactory(discoveryService: DiscoveryService) {
        return discoveryService
          .getProviders({
            metadataKey: AnimalProvider.KEY,
          })
          .filter((p) => {
            const x = discoveryService.getMetadataByDecorator(
              AnimalProvider,
              p,
            );
            // receive the metadata
            console.log(x?.name);
            return true;
          })
          .map((p) => p.instance);
      },
      inject: [DiscoveryService],
    },
  ],
})
export class ExplorerModule {}
