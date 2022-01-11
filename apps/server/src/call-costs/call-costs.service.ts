import { Injectable } from '@nestjs/common';
import { CreateCallCostInput } from './dto/create-call-cost.input';
import { UpdateCallCostInput } from './dto/update-call-cost.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CallCost } from './entities/call-cost.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { CalculatePriceWithPlanInput } from './dto/calculate-price-with-plan.input';
import { PlansService } from '../plans/plans.service';
import { ICalculatedPrice, ICallCost, IPlan } from '@loldesign/interfaces';

@Injectable()
export class CallCostsService {
  constructor(
    @InjectRepository(CallCost)
    private readonly callCostRepository: Repository<CallCost>,
    private readonly plansService: PlansService
  ) {}

  async create(createCallCostInput: CreateCallCostInput) {
    const test = await this.callCostRepository.create(createCallCostInput);
    return this.callCostRepository.save(test);
  }

  async findAll() {
    return this.callCostRepository.find();
  }

  async findOne(id: string) {
    return this.callCostRepository.findOneOrFail(id);
  }

  async calculatePriceWithPlan(
    calculatePriceWithPlanInput: CalculatePriceWithPlanInput
  ) {
    const plan: IPlan = await this.plansService.findOne(
      calculatePriceWithPlanInput.plan_id
    );
    if (!plan) {
      return new GraphQLError(
        `A Plan with ID ${calculatePriceWithPlanInput.plan_id} doesn't exist`
      );
    }

    const callCost: ICallCost = await this.findOne(
      calculatePriceWithPlanInput.call_cost_id
    );

    if (!callCost) {
      return new GraphQLError(
        `A Call Cost with ID ${calculatePriceWithPlanInput.call_cost_id} doesn't exist`
      );
    }

    const calculatedNewPricePerMinute: number =
      (10 / 100) * callCost.price_per_minute;

    const parsedPricePerMinute: number = parseFloat(
      `${callCost.price_per_minute}`
    );

    const newPricePerMinute: number =
      calculatedNewPricePerMinute + parsedPricePerMinute;

    const priceWithPlan =
      calculatePriceWithPlanInput.minutes > plan.free_minutes
        ? newPricePerMinute *
          (calculatePriceWithPlanInput.minutes - plan.free_minutes)
        : 0;

    const calculatedPriceOutput: ICalculatedPrice = {
      plan,
      call_cost: callCost,
      minutes: calculatePriceWithPlanInput.minutes,
      price_without_plan:
        calculatePriceWithPlanInput.minutes * callCost.price_per_minute,
      price_with_plan: priceWithPlan,
    };

    return calculatedPriceOutput;
  }

  async update(id: string, updateCallCostInput: UpdateCallCostInput) {
    const callCost = await this.findOne(id);
    if (!callCost) {
      return new GraphQLError(`A Call Cost with ID ${id} doesn't exist`);
    }

    const newCallCost = new CallCost();
    Object.assign(newCallCost, updateCallCostInput);

    return await this.callCostRepository.save({
      id: callCost.id,
      ...callCost,
      ...newCallCost,
    });
  }

  async remove(id: string) {
    const callCost = await this.findOne(id);
    if (!callCost) {
      return new GraphQLError(`A Call Cost with ID ${id} doesn't exist`);
    }

    return this.callCostRepository.remove(callCost);
  }
}
