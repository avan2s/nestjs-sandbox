import { Test, TestingModule } from '@nestjs/testing';
import { ServiceA1Service } from './service-a1.service';

describe('ServiceA1Service', () => {
  let service: ServiceA1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceA1Service],
    }).compile();

    service = module.get<ServiceA1Service>(ServiceA1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
