import { AnimalService } from '../abstracts/animal.service';
import { AnimalProvider } from '../decorators/animal-provider.decorator';

@AnimalProvider({ name: 'cat' })
export class CatService extends AnimalService {
  public makeSound(): void {
    console.log('miau');
  }
}
