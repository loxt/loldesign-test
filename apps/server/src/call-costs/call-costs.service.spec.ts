import { Test, TestingModule } from '@nestjs/testing';
import { CallCostsService } from './call-costs.service';

describe('CallCostsService', () => {
  let service: CallCostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallCostsService],
    }).compile();

    service = module.get<CallCostsService>(CallCostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
