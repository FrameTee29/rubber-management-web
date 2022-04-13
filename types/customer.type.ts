import { TBase } from "./base.type";
import { TBaseQuery } from "./baseQuery.type";

// Form , body , param
export type RegisterCustomerForm = {
  fullName: string;
  phone: string;
  address: string;
};

export type updateCustomerForm = {
  id: number;
  fullName: string;
  phone: string;
  address: string;
};

export type CustomerParam = TBaseQuery & {};

//  Response
export type TCustomer = TBase & {
  fullName: string;
  phone: string;
  address: string;
};
