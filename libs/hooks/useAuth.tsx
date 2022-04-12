import { useMutation } from "react-query";

import AuthService from "@services/auth.service";
import { LoginForm, RegisterForm } from "types/auth.type";

export function useAuth() {
  // Query TODO: if have method for query , can do it this here.

  // Mutation
  const { mutateAsync: register } = useMutation(
    async (form: RegisterForm) => await AuthService.register(form)
  );

  const { mutateAsync: login } = useMutation(
    async (form: LoginForm) => await AuthService.login(form)
  );

  return { register, login };
}
