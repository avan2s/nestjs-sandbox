import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ExplorerService } from './explorer.service';

@Module({ imports: [DiscoveryModule], providers: [ExplorerService] })
export class ExplorerModule {}
