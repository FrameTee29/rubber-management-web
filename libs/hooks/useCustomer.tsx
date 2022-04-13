import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

import { transformResponse } from "./transformResponse";
import CustomerService from "@services/customer.service";
import { CustomerParam, RegisterCustomerForm } from "types/customer.type";

export function useCustomer() {
  // Query
  const getCustomers = (params: CustomerParam) => {
    const response = useQuery(
      "getCustomers",
      async () => await CustomerService.getCustomers(params)
    );
    return transformResponse(response);
  };

  // Mutation
  const { mutateAsync: registerCustomer } = useMutation(
    async (form: RegisterCustomerForm) =>
      await CustomerService.registerCustomer(form),
    {
      onError: (result: any) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: JSON.stringify(result?.response?.data?.message),
        });
      },
    }
  );

  return { getCustomers, registerCustomer };
}
