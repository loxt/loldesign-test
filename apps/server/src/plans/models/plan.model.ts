import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPlan } from '@loldesign/interfaces';

@ObjectType()
export class Plan implements IPlan {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  free_minutes: number;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
