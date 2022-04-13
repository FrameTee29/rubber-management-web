import axios, { AxiosResponse } from "axios";

const url = process.env.NEXT_PUBLIC_API_SERVICES || "";

const httpClient = (baseURL: string = url) => {
  return axios.create({
    baseURL,
  });
};

httpClient().interceptors.request.use(async (config: any) => {
  const token = "";

  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

httpClient().interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return httpClient(error.response);
      } else if (error?.response?.status === 400) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default httpClient;
