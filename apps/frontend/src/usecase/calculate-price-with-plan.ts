import { useQuery } from 'react-query';
import request from 'graphql-request';
import { ICalculatedPrice } from '@loldesign/interfaces';
import { GET_CALCULATED_PRICE } from '../infra/adapter/graphql/query/get-calculated-price';

export default function useCalculatePriceWithPlan(
  planId: string,
  callCostId: string,
  minutes = 0,
  enabled = false
) {
  return useQuery(
    'calculatePriceWithPlan',
    async () => {
      const {
        calculatePriceWithPlan: data,
      }: { calculatePriceWithPlan: ICalculatedPrice } = await request(
        process.env.NEXT_PUBLIC_API_URL,
        GET_CALCULATED_PRICE,
        {
          planId,
          callCostId,
          minutes,
        }
      );
      return data;
    },
    {
      enabled: false,
    }
  );
}
