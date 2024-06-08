import { AnimalService } from '../abstracts/animal.service';
import { AnimalProvider } from '../decorators/animal-provider.decorator';

@AnimalProvider({ name: 'dog' })
export class DogService extends AnimalService {
  public makeSound(): void {
    console.log('woof');
  }
}
