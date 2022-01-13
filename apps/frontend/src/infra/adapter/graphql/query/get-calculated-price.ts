import { gql } from 'graphql-request';

export const GET_CALCULATED_PRICE = gql`
  query getCalculatePriceWithPlan(
    $planId: String!
    $callCostId: String!
    $minutes: Int!
  ) {
    calculatePriceWithPlan(
      calculatePriceWithPlanInput: {
        plan_id: $planId
        call_cost_id: $callCostId
        minutes: $minutes
      }
    ) {
      minutes
      price_with_plan
      price_without_plan
    }
  }
`;
