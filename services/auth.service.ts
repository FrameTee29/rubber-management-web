import httpClient from "./httpClient";

import { TResponse } from "types/response";
import { LoginForm, TLoginResponse, RegisterForm } from "types/auth.type";

const register = (body: RegisterForm): Promise<TResponse<any>> => {
  return httpClient().post("/auth/register", body);
};

const login = (body: LoginForm): Promise<TResponse<TLoginResponse>> => {
  return httpClient().post("/auth/login", body);
};

const AuthService = { register, login };

export default AuthService;
