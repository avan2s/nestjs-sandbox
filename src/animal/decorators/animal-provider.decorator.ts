import { DiscoveryService } from '@nestjs/core';

export const AnimalProvider = DiscoveryService.createDecorator<{
  name: string;
}>();
