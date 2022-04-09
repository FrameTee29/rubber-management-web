import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { WhiteButton } from "@components/ui/Button";

const AuthNavbar: FC = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0  container mx-auto">
      <div className="flex justify-between h-20 items-center">
        <div className="font-semibold text-white text-2xl">
          <img src="/images/logo_transparent.png" className="w-28"></img>
        </div>
        <div>
          {router.pathname === "/auth/signin" ? (
            <Link href={"/auth/signup"}>
              <a>
                <WhiteButton>
                  <p className="font-semibold">Register</p>
                </WhiteButton>
              </a>
            </Link>
          ) : (
            <Link href={"/auth/signin"}>
              <a>
                <WhiteButton>
                  <p className="font-semibold">Login</p>
                </WhiteButton>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
