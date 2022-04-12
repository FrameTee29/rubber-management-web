import { TBase } from "./base.type";

// Response
export type TUser = TBase & {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};
