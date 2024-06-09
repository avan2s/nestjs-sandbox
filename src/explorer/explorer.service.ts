import { Inject, Injectable } from '@nestjs/common';
import { AnimalProvider, AnimalService } from 'src/animal';
import { PartyProvider, PartyService } from 'src/party';
import { HousePartyService } from 'src/party/services/house-party/house-party.service';
import { ServiceDiscoveryService } from 'src/service-discovery';

@Injectable()
export class ExplorerService {
  constructor(
    @Inject(AnimalProvider.name + 'list')
    private readonly animals: AnimalService[],
    @Inject(PartyProvider.TOKEN_ALL) private readonly parties: PartyService[],
    @Inject('bigParties') private readonly bigParties: PartyService[],
    private readonly serviceDiscovery: ServiceDiscoveryService,
  ) {
    console.log(`found ${this.animals.length} animals`);
    this.animals.forEach((animal) => {
      console.log(`Discovered provider: ${animal.constructor.name}`);
      animal.makeSound();
    });

    console.log(
      `\nfound ${this.parties.length} parties at all via the ALL token`,
    );
    this.parties.forEach((party) => {
      party.celebrate();
    });

    console.log(
      `\nfound ${bigParties.length} big parties via custom injection token`,
    );
    this.bigParties.forEach((party) => {
      party.celebrate();
    });

    const smallParties = this.serviceDiscovery.getProviderInstances(
      PartyProvider,
      (params) => params.size === 'small',
    );

    console.log(`\nfound ${smallParties.length} small parties at runtime`);
    smallParties.forEach((party) => {
      party.celebrate();
    });

    const housePartyFromAllParties = this.parties.find(
      (p) => p instanceof HousePartyService,
    );

    const housePartyFromSmallParties = smallParties.find(
      (p) => p instanceof HousePartyService,
    );

    console.log(
      `sameHousePartyInstances = ${housePartyFromAllParties === housePartyFromSmallParties}`,
    );
  }
}
