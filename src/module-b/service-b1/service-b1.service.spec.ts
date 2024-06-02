import { Test, TestingModule } from '@nestjs/testing';
import { ServiceB1Service } from './service-b1.service';

describe('ServiceB1Service', () => {
  let service: ServiceB1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceB1Service],
    }).compile();

    service = module.get<ServiceB1Service>(ServiceB1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
