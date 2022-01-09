import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCallCostInput {
  @Field(() => String, { description: 'Call origin', nullable: false })
  origin: string;

  @Field(() => String, { description: 'Call destiny', nullable: false })
  destiny: string;

  @Field(() => Float, {
    description: 'Call price per minute cost',
    nullable: false,
  })
  price_per_minute: number;
}
