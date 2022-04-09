import { FC } from "react";

import { AuthNavbar } from "../Navbar";

interface IProps {
  pageProps: {};
}

const AuthLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="relative w-screen min-h-screen">
      <div className="absolute -z-10 flex h-screen w-2/5 bg-dark-green-primary"></div>
      <AuthNavbar />
      <main className="h-content">{children}</main>
    </div>
  );
};

export default AuthLayout;
