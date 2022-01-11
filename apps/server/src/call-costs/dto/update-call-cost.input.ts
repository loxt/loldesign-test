import { CreateCallCostInput } from './create-call-cost.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCallCostInput extends PartialType(CreateCallCostInput) {
  @Field(() => String)
  id: string;
}
