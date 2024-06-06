import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';
import { ServiceDiscoveryService } from 'src/service-discovery/service-discovery/service-discovery.service';
import { ExplorerService } from './explorer.service';

@Module({
  imports: [DiscoveryModule],
  providers: [
    ExplorerService,
    {
      provide: AnimalProvider,
      useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
        return serviceDiscoveryService.getServiceInstances(AnimalProvider);
      },
      inject: [ServiceDiscoveryService],
    },
  ],
})
export class ExplorerModule {}