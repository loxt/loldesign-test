import { Module } from '@nestjs/common';
import { CallCostsService } from './call-costs.service';
import { CallCostsResolver } from './call-costs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallCost } from './entities/call-cost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CallCost])],
  providers: [CallCostsResolver, CallCostsService],
})
export class CallCostsModule {}
