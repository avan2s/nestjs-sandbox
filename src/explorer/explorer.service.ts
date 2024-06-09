import { Inject, Injectable } from '@nestjs/common';
import { AnimalService } from 'src/animal/abstracts/animal.service';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';
import { PartyService } from 'src/party';
import { PartyProvider } from 'src/party/decorators/party-provider.decorator';

@Injectable()
export class ExplorerService {
  constructor(
    @Inject(AnimalProvider) private readonly animals: AnimalService[],
    @Inject(PartyProvider.TOKEN_LIST) private readonly parties: PartyService[],
  ) {
    console.log(`found ${this.animals.length} animals`);
    this.animals.forEach((animal) => {
      console.log(`Discovered provider: ${animal.constructor.name}`);
      animal.makeSound();
    });

    console.log(`\nfound ${this.parties.length} parties`);
    this.parties.forEach((party) => {
      party.celebrate();
    });
  }
}
