import { AuthLayout } from "@components/common/Layout";
import { SignInForm } from "@components/modules/auth";

export default function SignInPage() {
  return (
    <div className="flex flex-col mx-auto h-full justify-center items-center -mt-20">
      <SignInForm />
    </div>
  );
}

SignInPage.Layout = AuthLayout;
