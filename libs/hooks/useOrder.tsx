import { useMutation, useQuery } from "react-query";

import OrderService from "@services/order.service";

import { CreateOrderForm, OrderParam } from "types/order.type";
import { transformResponse } from "./transformResponse";

export function useOrder() {
  // Query
  const getOrder = (orderParam: OrderParam) => {
    const response = useQuery(
      "getOrder",
      async () => await OrderService.getOrders(orderParam)
    );
    return transformResponse(response);
  };
  // Mutation
  const { mutateAsync: createOrder } = useMutation(
    async (form: CreateOrderForm) => await OrderService.createOrder(form)
  );

  return { getOrder, createOrder };
}
