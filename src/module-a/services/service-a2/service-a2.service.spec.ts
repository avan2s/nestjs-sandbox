import { Test, TestingModule } from '@nestjs/testing';
import { ServiceA2Service } from './service-a2.service';

describe('ServiceA2Service', () => {
  let service: ServiceA2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceA2Service],
    }).compile();

    service = module.get<ServiceA2Service>(ServiceA2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
