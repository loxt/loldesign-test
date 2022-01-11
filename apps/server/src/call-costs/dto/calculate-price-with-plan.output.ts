import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Plan } from '../../plans/models/plan.model';
import { CallCost } from '../models/call-cost.model';
import { ICalculatedPrice, ICallCost, IPlan } from '@loldesign/interfaces';

@ObjectType()
export class CalculatePriceWithPlanOutput implements ICalculatedPrice {
  @Field(() => Plan, {
    description: 'Plan calculated',
    nullable: false,
  })
  plan: IPlan;

  @Field(() => CallCost, {
    description: 'Call Cost details',
    nullable: false,
  })
  call_cost: ICallCost;

  @Field(() => Int, {
    description: 'Minutes',
    nullable: false,
  })
  minutes: number;

  @Field(() => Float, {
    description: 'Price with plan',
    nullable: false,
  })
  price_with_plan: number;

  @Field(() => Float, {
    description: 'Price without plan',
    nullable: false,
  })
  price_without_plan: number;
}
