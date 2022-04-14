import { TBase } from "./base.type";
import { TBaseQuery } from "./baseQuery.type";
import { TCustomer } from "./customer.type";

// Form , body , param
export type CreateOrderForm = {
  pricePerUnit: number;
  customerName: string;
  orderItems: number[];
  employer?: number;
  employee?: number;
};

export type TOrder = TBase & {
  orderNumber: string;
  weightTotal: string;
  priceTotal: string;
  pricePerUnit: string;
  employer: string;
  employee: string;
  orderItems: IOrderItem[];
  customer: TCustomer;
};

export type IOrderItem = TBase & {
  weight: string;
};

export type OrderParam = TBaseQuery & {};
