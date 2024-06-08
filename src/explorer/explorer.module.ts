import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';
import { DisvoceredProvider } from 'src/service-discovery';
import { ExplorerService } from './explorer.service';
import { PartyProvider } from 'src/party/decorators/party-provider.decorator';

@Module({
  imports: [DiscoveryModule],
  providers: [
    ExplorerService,
    DisvoceredProvider.list(AnimalProvider),
    PartyProvider.forList(),
  ],
})
export class ExplorerModule {}
