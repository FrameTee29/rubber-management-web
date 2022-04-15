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
      <main className="w-full bg-gray-300 p-4 max-h-screen overflow-y-auto pb-10">{children}</main>
    </div>
  );
};

export default Layout;
