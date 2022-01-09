import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansResolver } from './plans.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  providers: [PlansResolver, PlansService],
})
export class PlansModule {}
