import { useQuery } from 'react-query';
import request from 'graphql-request';
import { GET_PLANS } from '../infra/adapter/graphql/query/get-plans';
import { IPlan } from '@loldesign/interfaces';

export default function usePlans() {
  return useQuery('plans', async () => {
    const { plans: data }: { plans: [IPlan] } = await request(
      process.env.NEXT_PUBLIC_API_URL,
      GET_PLANS
    );
    return data;
  });
}
