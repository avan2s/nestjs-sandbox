import { Inject, Injectable } from '@nestjs/common';
import { AnimalService } from 'src/animal/abstracts/animal.service';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';

@Injectable()
export class ExplorerService {
  constructor(
    @Inject(AnimalProvider) private readonly animals: AnimalService[],
  ) {
    console.log(this.animals.length);
    this.animals.forEach((animal) => {
      console.log(`Discovered provider: ${animal.constructor.name}`);
      animal.makeSound();
    });
  }
}
