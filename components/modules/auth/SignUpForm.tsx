import { FC, memo, useCallback, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  RegisterAccountDetail,
  RegisterForm,
  RegisterPersonalDetail,
} from "types/auth.type";
import { DarkGreenButton, WhiteButton } from "@components/ui/Button";
import { useAuth } from "@libs/hooks/useAuth";
import { useRouter } from "next/router";

enum StateSignUp {
  ACCOUNT_DETAIL = "Account detail",
  PERSONAL_DETAIL = "Personal detail",
}

const signUpPersonalDetailSchema = yup.object({
  firstName: yup.string().required("Please enter your name"),
  lastName: yup.string().required("Please enter your surname"),
  phone: yup.string().required("Please enter your phone"),
});

const signUpAccountDetailSchema = yup.object({
  email: yup.string().required("Please enter your email address"),
  password: yup.string().required("Please enter your password"),
  confirmPassword: yup.string().required("Please enter confirm password"),
});

const SignUpForm: FC = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [stateSignUp, setStateSignUp] = useState<StateSignUp>(
    StateSignUp.PERSONAL_DETAIL
  );

  const {
    getValues: getValuesOfPersonalDetail,
    register: registerPersonal,
    handleSubmit: handleSubmitRegisterPersonal,
    formState: { errors: errorsRegisterPersonal },
  } = useForm<RegisterPersonalDetail>({
    resolver: yupResolver(signUpPersonalDetailSchema),
  });

  const {
    getValues: getValuesOfAccountDetail,
    register: registerAccount,
    handleSubmit: handleSubmitRegisterAccount,
    setError: setErrorRegisterAccount,
    formState: { errors: errorsRegisterAccount },
  } = useForm<RegisterAccountDetail>({
    resolver: yupResolver(signUpAccountDetailSchema),
  });

  const handleRegister = async () => {
    if (
      getValuesOfAccountDetail("confirmPassword") !==
      getValuesOfAccountDetail("password")
    ) {
      setErrorRegisterAccount("confirmPassword", {
        type: "custom",
        message: "Passwords are not the same",
      });
    } else {
      const form = {
        ...getValuesOfAccountDetail(),
        ...getValuesOfPersonalDetail(),
      } as RegisterForm;
      await register(form);
      router.push("/auth/signin");
    }
  };

  const PersonalDetail = useCallback(() => {
    return (
      <>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Name</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your name"
            {...registerPersonal("firstName")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterPersonal.firstName && (
              <div className="text-red-600 text-xs">
                {errorsRegisterPersonal.firstName?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Surname</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your surname"
            {...registerPersonal("lastName")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterPersonal.lastName && (
              <div className="text-red-600 text-xs">
                {errorsRegisterPersonal.lastName?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-4 space-y-2">
          <label className="font-semibold">Phone</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your phone"
            {...registerPersonal("phone")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterPersonal.phone && (
              <div className="text-red-600 text-xs">
                {errorsRegisterPersonal.phone?.message}
              </div>
            )}
          </div>
        </div>
        <DarkGreenButton
          onClick={handleSubmitRegisterPersonal(() =>
            setStateSignUp(StateSignUp.ACCOUNT_DETAIL)
          )}
        >
          NEXT
        </DarkGreenButton>
      </>
    );
  }, [
    getValuesOfPersonalDetail("firstName"),
    getValuesOfPersonalDetail("lastName"),
    getValuesOfPersonalDetail("phone"),
  ]);

  const AccountDetail = useCallback(() => {
    return (
      <>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Email</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your email address"
            {...registerAccount("email")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterAccount.email && (
              <div className="text-red-600 text-xs">
                {errorsRegisterAccount.email?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="******"
            {...registerAccount("password")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterAccount.password && (
              <div className="text-red-600 text-xs">
                {errorsRegisterAccount.password?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-5 space-y-2">
          <label className="font-semibold">Confirm Password</label>
          <input
            type="password"
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="******"
            {...registerAccount("confirmPassword")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterAccount.confirmPassword && (
              <div className="text-red-600 text-xs">
                {errorsRegisterAccount.confirmPassword?.message}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <WhiteButton
            className="w-full"
            onClick={() => setStateSignUp(StateSignUp.PERSONAL_DETAIL)}
          >
            BACK
          </WhiteButton>
          <DarkGreenButton
            type="submit"
            onClick={handleSubmitRegisterAccount(handleRegister)}
          >
            REGISTER
          </DarkGreenButton>
        </div>
      </>
    );
  }, [
    getValuesOfAccountDetail("email"),
    getValuesOfAccountDetail("password"),
    getValuesOfAccountDetail("confirmPassword"),
  ]);

  return (
    <div className="flex flex-col bg-white w-[512px] px-12 py-16 rounded-lg border shadow-md">
      <div className="text-center mb-7 text-2xl font-semibold">Register</div>
      {stateSignUp === StateSignUp.ACCOUNT_DETAIL && <AccountDetail />}
      {stateSignUp === StateSignUp.PERSONAL_DETAIL && <PersonalDetail />}
    </div>
  );
};

export default memo(SignUpForm);
