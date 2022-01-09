import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePlanInput {
  @Field(() => String, { description: 'Plan name' })
  name: string;

  @Field(() => Int, { description: 'Free minutes' })
  free_minutes: number;
}
