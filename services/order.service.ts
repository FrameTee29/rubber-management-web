import httpClient from "./httpClient";

import { CreateOrderForm, OrderParam, TOrder } from "types/order.type";
import { TResponse } from "types/response";
import { TPagination } from "types/pagination";

const createOrder = (body: CreateOrderForm) => {
  return httpClient().post("/orders", body);
};

const getOrders = (
  params: OrderParam
): Promise<TResponse<TPagination<TOrder[]>>> => {
  return httpClient().get("/orders", { params });
};

const getOrderByCustomerPhone = () => {};

const OrderService = { createOrder, getOrders, getOrderByCustomerPhone };

export default OrderService;
