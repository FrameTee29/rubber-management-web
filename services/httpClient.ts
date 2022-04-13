import { KeyLocalStorage } from "@constants/keyLocalStorage";
import axios, { AxiosResponse } from "axios";

const url = process.env.NEXT_PUBLIC_API_SERVICES || "";

export default function httpClient(baseURL: string = url) {
  const http = axios.create({
    baseURL: baseURL,
  });

  http.interceptors.request.use(async (config: any) => {
    const token = await localStorage.getItem(KeyLocalStorage.accessToken);

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  http.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          return Promise.reject(error);
        } else if (error?.response?.status === 400) {
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      }
    }
  );
  return http;
}
