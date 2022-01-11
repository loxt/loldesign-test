import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CalculatePriceWithPlanInput {
  @Field(() => String, {
    description: 'Plan ID to calculate price',
    nullable: false,
  })
  plan_id: string;

  @Field(() => String, {
    description: 'Call Cost ID to calculate price',
    nullable: false,
  })
  call_cost_id: string;

  @Field(() => Int, {
    description: 'Minutes to calculate',
    nullable: false,
  })
  minutes: number;
}
