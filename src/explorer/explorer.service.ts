import { Inject, Injectable } from '@nestjs/common';
import { AnimalService } from 'src/animal/abstracts/animal.service';
import { AnimalProvider } from 'src/animal/decorators/animal-provider.decorator';
import { PartyService } from 'src/party';
import { PartyProvider } from 'src/party/decorators/party-provider.decorator';

@Injectable()
export class ExplorerService {
  constructor(
    @Inject(AnimalProvider.name + 'list')
    private readonly animals: AnimalService[],
    @Inject(PartyProvider.TOKEN_ALL) private readonly parties: PartyService[],
    @Inject('bigParties') private readonly bigParties: PartyService[],
    // private readonly serviceDiscovery: ServiceDiscoveryService,
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

    console.log(`\nfound ${this.parties.length} big parties`);
    this.bigParties.forEach((party) => {
      party.celebrate();
    });
  }
}
