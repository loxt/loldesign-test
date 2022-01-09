import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('callCosts')
export class CallCost {
  @Field(() => String)
  id: string;

  @Field(() => String)
  origin: string;

  @Field(() => String)
  destiny: string;

  @Field(() => Float)
  price_per_minute: number;
}
