import { FC } from "react";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

interface IProps {
  pageProps: {};
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
