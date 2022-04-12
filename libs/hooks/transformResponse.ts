import { UseQueryResult } from "react-query";

import { TResponse } from "types/response";

export const transformResponse = <T>(
  response: UseQueryResult<TResponse<T>>
) => {
  const { data, status, isLoading, isError, isSuccess, refetch } = response;
  return {
    data: data?.data,
    status: status,
    isLoading: isLoading,
    isError: isError,
    refetch: refetch,
    isSuccess: isSuccess,
  };
};
