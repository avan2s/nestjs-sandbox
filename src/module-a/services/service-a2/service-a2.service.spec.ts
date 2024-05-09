import { Test, TestingModule } from '@nestjs/testing';
import { ServiceA2ServiceImpl } from './service-a2.service';

describe('ServiceA2Service', () => {
  let service: ServiceA2ServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceA2ServiceImpl],
    }).compile();

    service = module.get<ServiceA2ServiceImpl>(ServiceA2ServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
