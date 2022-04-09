import { AuthLayout } from "@components/common/Layout";
import { DarkGreenButton } from "@components/ui/Button";

export default function SignUpPage() {
  return (
    <div className="flex flex-col mx-auto h-full justify-center items-center -mt-20">
      <div className="flex flex-col bg-white w-[512px] px-12 py-16 rounded-lg border shadow-md">
        <div className="text-center mb-7 text-2xl font-semibold">Register</div>
        <div className="flex flex-col mb-5 space-y-2">
          <label className="font-semibold">Name</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your name"
          ></input>
        </div>
        <div className="flex flex-col mb-5 space-y-2">
          <label className="font-semibold">Surname</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your surname"
          ></input>
        </div>
        <div className="flex flex-col mb-5 space-y-2">
          <label className="font-semibold">Phone</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your phone"
          ></input>
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
        <div className="flex flex-col mb-5 space-y-2">
          <label className="font-semibold">Confirm Password</label>
          <input
            type="password"
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="******"
          ></input>
        </div>
        <DarkGreenButton>REGISTER</DarkGreenButton>
      </div>
    </div>
  );
}

SignUpPage.Layout = AuthLayout;
