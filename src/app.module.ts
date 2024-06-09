import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AnimalModule } from './animal/animal.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleAModule } from './module-a/module-a.module';
import { ModuleBModule } from './module-b/module-b.module';
import { ExplorerModule } from './explorer/explorer.module';
import { ServiceDiscoveryModule } from './service-discovery/service-discovery.module';
import { PartyModule } from './party/party.module';

@Module({
  imports: [
    ModuleAModule,
    ModuleBModule,
    AnimalModule,
    DiscoveryModule,
    ExplorerModule,
    ServiceDiscoveryModule,
    PartyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
