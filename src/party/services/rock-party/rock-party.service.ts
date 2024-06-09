import { Injectable } from '@nestjs/common';
import { PartyService } from 'src/party/abstracts/party.service';
import { PartyProvider } from 'src/party/decorators/party-provider.decorator';

@Injectable()
@PartyProvider({ size: 'big' })
export class RockPartyService extends PartyService {
  public celebrate(): void {
    console.log('Rock show yeah!');
  }
}
