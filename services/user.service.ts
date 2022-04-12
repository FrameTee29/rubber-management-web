import httpClient from "./httpClient";

import { TUser } from "types/user.type";
import { TResponse } from "types/response";

const getUserProfile = (): Promise<TResponse<TUser>> => {
  return httpClient().get("/users/profile");
};

const UserService = { getUserProfile };

export default UserService;
