import withAuth from "@libs/hoc/withAuth";
import { AuthLayout } from "@components/common/Layout";
import { SignUpForm } from "@components/modules/auth";

export default function SignUpPage() {
  return (
    <div className="flex flex-col mx-auto h-full justify-center items-center -mt-20">
      <SignUpForm />
    </div>
  );
}

SignUpPage.Layout = withAuth(AuthLayout);
