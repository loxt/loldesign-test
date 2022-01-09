import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Plan {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  free_minutes: number;
}
