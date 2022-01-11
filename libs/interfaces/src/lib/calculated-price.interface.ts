import { ICallCost, IPlan } from '@loldesign/interfaces';

export interface ICalculatedPrice {
  plan: IPlan;
  call_cost: ICallCost;

  minutes: number;
  price_without_plan: number;
  price_with_plan: number;
}
