import httpClient from "./httpClient";

import { CreateOrderForm, OrderParam, TOrder } from "types/order.type";
import { TResponse } from "types/response";
import { TPagination } from "types/pagination";

const createOrder = (body: CreateOrderForm) => {
  return httpClient().post("/orders/create", body);
};

const getOrders = (
  params: OrderParam
): Promise<TResponse<TPagination<TOrder[]>>> => {
  return httpClient().get("/orders", { params });
};

const getOrderByOrderNumber = (orderNumber: string) => {
  return httpClient().get(`/orders/ordernumber/${orderNumber}`);
};

const getOrderByCustomerPhone = () => {};

const OrderService = { createOrder, getOrders, getOrderByCustomerPhone, getOrderByOrderNumber};

export default OrderService;
