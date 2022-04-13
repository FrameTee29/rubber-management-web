import { FC, memo } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginForm } from "types/auth.type";
import { DarkGreenButton } from "@components/ui/Button";
import { useAuth } from "@libs/hooks/useAuth";
import { useRouter } from "next/router";
import { KeyLocalStorage } from "@constants/keyLocalStorage";

const loginSchema = yup.object({
  username: yup.string().required("Please enter your email address"),
  password: yup.string().required("Please enter your password"),
});

const SignInForm: FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (form: LoginForm) => {
    try {
      const { data } = await login(form);
      localStorage.setItem(KeyLocalStorage.accessToken, data.accessToken);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col bg-white w-[512px] px-12 py-16 rounded-lg border shadow-md">
      <div className="text-center mb-7 text-2xl font-semibold">
        Authorization
      </div>
      <div className="flex flex-col mb-2 space-y-2">
        <label className="font-semibold">Email</label>
        <input
          className="border px-2 py-2 rounded-md text-sm"
          placeholder="Your email address"
          {...register("username")}
        ></input>
        <div className="w-full h-4">
          {errors.username && (
            <div className="text-red-600 text-xs">
              {errors.username?.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col mb-4 space-y-2">
        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="border px-2 py-2 rounded-md text-sm"
          placeholder="******"
          {...register("password")}
        ></input>
        <div className="w-full h-4">
          {errors.password && (
            <div className="text-red-600 text-xs">
              {errors.password?.message}
            </div>
          )}
        </div>
      </div>
      <DarkGreenButton onClick={handleSubmit(handleLogin)}>
        LOGIN
      </DarkGreenButton>
    </div>
  );
};

export default memo(SignInForm);
