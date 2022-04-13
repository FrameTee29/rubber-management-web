import { TResponse } from "types/response";
import {
  TCustomer,
  RegisterCustomerForm,
  CustomerParam,
  updateCustomerForm,
} from "types/customer.type";
import { TPagination } from "types/pagination";
import { KeyLocalStorage } from "@constants/keyLocalStorage";
import httpClient from "./httpClient";

const registerCustomer = (
  body: RegisterCustomerForm
): Promise<TResponse<any>> => {
  return httpClient().post("/customers/register", body);
};
const updateCustomer = (
  id: number,
  body: updateCustomerForm
): Promise<TResponse<any>> => {
  return httpClient().patch(`/customers/${id}`, body);
};

const getCustomers = (
  params: CustomerParam
): Promise<TResponse<TPagination<TCustomer[]>>> => {
  return httpClient().get("/customers", { params });
};

const CustomerService = { registerCustomer, getCustomers, updateCustomer };

export default CustomerService;
