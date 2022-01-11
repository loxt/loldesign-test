import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ICallCost } from '@loldesign/interfaces';

@ObjectType('callCosts')
export class CallCost implements ICallCost {
  @Field(() => String)
  id: string;

  @Field(() => String)
  origin: string;

  @Field(() => String)
  destiny: string;

  @Field(() => Float)
  price_per_minute: number;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
