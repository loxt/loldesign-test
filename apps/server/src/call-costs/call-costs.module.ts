import { Module } from '@nestjs/common';
import { CallCostsService } from './call-costs.service';
import { CallCostsResolver } from './call-costs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallCost } from './entities/call-cost.entity';
import { PlansService } from '../plans/plans.service';
import { Plan } from '../plans/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CallCost, Plan])],
  providers: [CallCostsResolver, CallCostsService, PlansService],
})
export class CallCostsModule {}
