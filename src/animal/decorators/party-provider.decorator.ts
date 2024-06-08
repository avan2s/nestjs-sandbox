import { createExtendedDecorator } from 'src/service-discovery';

export const ExtendedAnimalProvider = createExtendedDecorator<{
  name: string;
}>('party');
