import { Module } from '@nestjs/common';
import { HousePartyService } from './services/house-party/house-party.service';
import { RockPartyService } from './services/rock-party/rock-party.service';

@Module({
  providers: [HousePartyService, RockPartyService],
  exports: [HousePartyService, RockPartyService],
})
export class PartyModule {}
