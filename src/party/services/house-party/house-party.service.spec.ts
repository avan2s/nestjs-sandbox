import { Test, TestingModule } from '@nestjs/testing';
import { HousePartyService } from './house-party.service';

describe('HousePartyService', () => {
  let service: HousePartyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HousePartyService],
    }).compile();

    service = module.get<HousePartyService>(HousePartyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
