import { useMutation } from "react-query";

import OrderService from "@services/order.service";

import { CreateOrderForm } from "types/order.type";

export function useOrder() {
  // Query

  // Mutation
  const { mutateAsync: createOrder } = useMutation(
    async (form: CreateOrderForm) => await OrderService.createOrder(form)
  );

  return { createOrder };
}
