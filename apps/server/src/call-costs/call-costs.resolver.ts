import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CallCostsService } from './call-costs.service';
import { CallCost } from './models/call-cost.model';
import { CreateCallCostInput } from './dto/create-call-cost.input';
import { UpdateCallCostInput } from './dto/update-call-cost.input';
import { CalculatePriceWithPlanInput } from './dto/calculate-price-with-plan.input';
import { CalculatePriceWithPlanOutput } from './dto/calculate-price-with-plan.output';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => CallCost)
export class CallCostsResolver {
  constructor(private readonly callCostsService: CallCostsService) {}

  @Mutation(() => CallCost)
  async createCallCost(
    @Args('createCallCostInput') createCallCostInput: CreateCallCostInput
  ) {
    return this.callCostsService.create(createCallCostInput);
  }

  @Query(() => [CallCost], { name: 'callCosts' })
  async findAll() {
    return this.callCostsService.findAll();
  }

  @Query(() => CallCost, { name: 'callCost' })
  async findOne(
    @Args('id', { type: () => Int }, new ParseUUIDPipe({ version: '4' }))
    id: string
  ) {
    return this.callCostsService.findOne(id);
  }

  @Query(() => [CallCost], { name: 'callCostByOrigin' })
  async findByOrigin(@Args('origin', { type: () => String }) origin: string) {
    return this.callCostsService.findByOrigin(origin);
  }

  @Query(() => CalculatePriceWithPlanOutput, { name: 'calculatePriceWithPlan' })
  async calculatePriceWithPlan(
    @Args('calculatePriceWithPlanInput')
    calculatePriceWithPlanInput: CalculatePriceWithPlanInput
  ) {
    return this.callCostsService.calculatePriceWithPlan(
      calculatePriceWithPlanInput
    );
  }

  @Mutation(() => CallCost)
  async updateCallCost(
    @Args('updateCallCostInput') updateCallCostInput: UpdateCallCostInput
  ) {
    return this.callCostsService.update(
      updateCallCostInput.id,
      updateCallCostInput
    );
  }

  @Mutation(() => CallCost)
  async removeCallCost(
    @Args('id', { type: () => String }, new ParseUUIDPipe({ version: '4' }))
    id: string
  ) {
    return this.callCostsService.remove(id);
  }
}
