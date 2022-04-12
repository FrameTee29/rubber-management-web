import UserService from "@services/user.service";
import { useQuery } from "react-query";
import { transformResponse } from "./transformResponse";

export function useUser() {
  // Query
  const getUserProfile = () => {
    const response = useQuery(
      "getUserProfile",
      async () => await UserService.getUserProfile()
    );
    return transformResponse(response);
  };

  return { getUserProfile };
}
