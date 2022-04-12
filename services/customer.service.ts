import httpClient from "./httpClient";

import { TResponse } from "types/response";
import {
  TCustomer,
  RegisterCustomerForm,
  CustomerParam,
} from "types/customer.type";
import { TPagination } from "types/pagination";

const registerCustomer = (
  body: RegisterCustomerForm
): Promise<TResponse<any>> => {
  return httpClient().post("/customers/register", body);
};

const getCustomers = (
  params: CustomerParam
): Promise<TResponse<TPagination<TCustomer[]>>> => {
  return httpClient().get("/customers", { params });
};

const CustomerService = { registerCustomer, getCustomers };

export default CustomerService;
