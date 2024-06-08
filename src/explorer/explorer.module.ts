import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DisvoceredProvider } from 'src/service-discovery/service-discovery/service-discovery.service';
import { ExplorerService } from './explorer.service';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';

@Module({
  imports: [DiscoveryModule],
  providers: [ExplorerService, DisvoceredProvider.list(AnimalProvider)],
})
export class ExplorerModule {}
