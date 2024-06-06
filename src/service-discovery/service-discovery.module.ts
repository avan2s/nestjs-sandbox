import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [ServiceDiscoveryService],
  exports: [ServiceDiscoveryService],
})
export class ServiceDiscoveryModule {}
