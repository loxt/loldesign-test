import { CreatePlanInput } from './create-plan.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdatePlanInput extends PartialType(CreatePlanInput) {
  @Field(() => String)
  @IsUUID('4')
  id: string;
}
