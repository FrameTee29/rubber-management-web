import { CreateOrderForm } from "types/order.type";
import httpClient from "./httpClient";

const createOrder = (body: CreateOrderForm) => {
  return httpClient().post("/orders", body);
};

const getOrders = () => {};

const getOrderByCustomerPhone = () => {};

const OrderService = { createOrder, getOrders, getOrderByCustomerPhone };

export default OrderService;
