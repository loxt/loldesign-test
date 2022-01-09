import { CreateCallCostInput } from './create-call-cost.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCallCostInput extends PartialType(CreateCallCostInput) {
  @Field(() => Int)
  id: number;
}
