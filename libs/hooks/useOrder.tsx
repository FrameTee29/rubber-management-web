import { useMutation, useQuery } from "react-query";

import OrderService from "@services/order.service";

import { CreateOrderForm, OrderParam } from "types/order.type";
import { transformResponse } from "./transformResponse";
import Swal from "sweetalert2";

export function useOrder() {
  // Query
  const getOrder = (orderParam: OrderParam) => {
    const response = useQuery(
      "getOrder",
      async () => await OrderService.getOrders(orderParam)
    );
    return transformResponse(response);
  };

  const getOrderByOrderNumber = (orderNumber: string) => {
    const response = useQuery(
      "getOrderByOrderNumber",
      async () => await OrderService.getOrderByOrderNumber(orderNumber)
    );
    return transformResponse(response);
  };
  // Mutation
  const { mutateAsync: createOrder } = useMutation(
    async (form: CreateOrderForm) => await OrderService.createOrder(form),
    {
      onSuccess: () => {
        Swal.fire({ icon: "success", text: "Create order successfully" });
      },
      onError: (result: any) => {
        Swal.fire({ icon: "error", text: result?.response?.data?.message });
      },
    }
  );

  return { getOrder, createOrder, getOrderByOrderNumber };
}
