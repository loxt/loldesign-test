import { useQuery } from 'react-query';
import request from 'graphql-request';
import { ICallCost } from '@loldesign/interfaces';
import { GET_CALL_COSTS } from '../infra/adapter/graphql/query/get-call-costs';

export default function useCallCosts() {
  return useQuery('callCosts', async () => {
    const { callCosts: data }: { callCosts: [ICallCost] } = await request(
      process.env.NEXT_PUBLIC_API_URL,
      GET_CALL_COSTS
    );
    return data;
  });
}
