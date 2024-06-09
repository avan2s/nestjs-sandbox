import { createServiceDecorator } from 'src/service-discovery';
import { PartyService } from '../abstracts';

export const PartyProvider = createServiceDecorator<{
  size: 'big' | 'small';
}>(PartyService.name);
