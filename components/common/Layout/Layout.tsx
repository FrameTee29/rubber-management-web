import { FC } from "react";
import { Navbar } from "../Navbar";
import Sidebar from "../Sidebar/Sidebar";

interface IProps {
  pageProps: {};
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex w-full bg-white p-4">{children}</main>
    </div>
  );
};

export default Layout;
