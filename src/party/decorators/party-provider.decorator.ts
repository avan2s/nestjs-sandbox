import { createExtendedDecorator } from 'src/service-discovery';

export const PartyProvider = createExtendedDecorator<{ size: 'big' | 'small' }>(
  'party',
);
