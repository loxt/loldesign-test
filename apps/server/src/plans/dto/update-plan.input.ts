import { CreatePlanInput } from './create-plan.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlanInput extends PartialType(CreatePlanInput) {
  @Field(() => String)
  id: string;
}
