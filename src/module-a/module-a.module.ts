import { Module } from '@nestjs/common';
import { ServiceA1Service } from './services/service-a1/service-a1.service';
import { ServiceA2Service } from './services/service-a2/service-a2.service';

@Module({
  providers: [ServiceA1Service, ServiceA2Service],
})
export class ModuleAModule {}
