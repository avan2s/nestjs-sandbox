import { Test, TestingModule } from '@nestjs/testing';
import { RockPartyService } from './rock-party.service';

describe('RockPartyService', () => {
  let service: RockPartyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RockPartyService],
    }).compile();

    service = module.get<RockPartyService>(RockPartyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
