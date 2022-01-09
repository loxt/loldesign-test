import { Test, TestingModule } from '@nestjs/testing';
import { CallCostsResolver } from './call-costs.resolver';
import { CallCostsService } from './call-costs.service';

describe('CallCostsResolver', () => {
  let resolver: CallCostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallCostsResolver, CallCostsService],
    }).compile();

    resolver = module.get<CallCostsResolver>(CallCostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
