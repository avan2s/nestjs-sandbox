import { AnimalProvider } from '../decorators/animal-provider.decorator';
console.log(AnimalProvider.KEY);
@AnimalProvider({ name: 'animal' })
export class CatService {}
