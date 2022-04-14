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
import { TOrder } from "types/order.type";

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

const getCustomersSummary = (params: {
  phone: string;
  start?: string;
  end?: string;
  year?: string;
  day?: string;
}) => {
  return httpClient().get("/customers/summary", { params });
};

const CustomerService = {
  registerCustomer,
  getCustomers,
  updateCustomer,
  getCustomersSummary,
};

export default CustomerService;
