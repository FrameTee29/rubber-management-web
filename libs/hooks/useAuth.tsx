import Swal from "sweetalert2";
import { useMutation } from "react-query";

import AuthService from "@services/auth.service";
import { LoginForm, RegisterForm } from "types/auth.type";

export function useAuth() {
  // Query TODO: if have method for query , can do it this here.

  // Mutation
  const { mutateAsync: register } = useMutation(
    async (form: RegisterForm) => await AuthService.register(form),
    {
      onError: (result: any) => {
        Swal.fire({
          icon: "error",
          text: JSON.stringify(result?.response?.data?.message),
        });
      },
    }
  );

  const { mutateAsync: login } = useMutation(
    async (form: LoginForm) => await AuthService.login(form),
    {
      onError: (result: any) => {
        Swal.fire({
          icon: "error",
          text: JSON.stringify(result?.response?.data?.message),
        });
      },
    }
  );

  return { register, login };
}
