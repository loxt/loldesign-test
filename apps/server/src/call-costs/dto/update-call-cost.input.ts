import { CreateCallCostInput } from './create-call-cost.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateCallCostInput extends PartialType(CreateCallCostInput) {
  @Field(() => String)
  @IsUUID('4')
  id: string;
}
