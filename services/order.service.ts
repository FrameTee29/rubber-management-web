import httpClient from "./httpClient";

import { CreateOrderForm } from "types/order.type";

const createOrder = (body: CreateOrderForm) => {
  return httpClient().post("/orders", body);
};

const getOrders = () => {};

const getOrderByCustomerPhone = () => {};

const OrderService = { createOrder, getOrders, getOrderByCustomerPhone };

export default OrderService;
