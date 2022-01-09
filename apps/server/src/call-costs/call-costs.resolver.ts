import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CallCostsService } from './call-costs.service';
import { CallCost } from './models/call-cost.model';
import { CreateCallCostInput } from './dto/create-call-cost.input';
import { UpdateCallCostInput } from './dto/update-call-cost.input';

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
  findAll() {
    return this.callCostsService.findAll();
  }

  @Query(() => CallCost, { name: 'callCost' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.callCostsService.findOne(id);
  }

  @Mutation(() => CallCost)
  updateCallCost(
    @Args('updateCallCostInput') updateCallCostInput: UpdateCallCostInput
  ) {
    return this.callCostsService.update(
      updateCallCostInput.id,
      updateCallCostInput
    );
  }

  @Mutation(() => CallCost)
  removeCallCost(@Args('id', { type: () => Int }) id: number) {
    return this.callCostsService.remove(id);
  }
}
