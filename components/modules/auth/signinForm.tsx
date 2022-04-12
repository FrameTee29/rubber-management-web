import { FC, memo } from "react";
import * as yup from "yup";

import { DarkGreenButton } from "@components/ui/Button";

const signInSchema = yup.object({
  email: yup.string().required("Please enter your email address"),
  password: yup.string().required("Please enter your password"),
});

const SignInForm: FC = () => {
  return (
    <div className="flex flex-col bg-white w-[512px] px-12 py-16 rounded-lg border shadow-md">
      <div className="text-center mb-7 text-2xl font-semibold">
        Authorization
      </div>
      <div className="flex flex-col mb-5 space-y-2">
        <label className="font-semibold">Email</label>
        <input
          className="border px-2 py-2 rounded-md text-sm"
          placeholder="Your email address"
        ></input>
      </div>
      <div className="flex flex-col mb-5 space-y-2">
        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="border px-2 py-2 rounded-md text-sm"
          placeholder="******"
        ></input>
      </div>
      <DarkGreenButton>LOGIN</DarkGreenButton>
    </div>
  );
};

export default memo(SignInForm);
