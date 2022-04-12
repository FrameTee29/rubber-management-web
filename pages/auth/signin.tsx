import { AuthLayout } from "@components/common/Layout";
import SignInForm from "@components/modules/auths/signinForm";
import { DarkGreenButton } from "@components/ui/Button";

export default function SignInPage() {
  console.log("Memo");
  return (
    <div className="flex flex-col mx-auto h-full justify-center items-center -mt-20">
      <SignInForm />
    </div>
  );
}

SignInPage.Layout = AuthLayout;
