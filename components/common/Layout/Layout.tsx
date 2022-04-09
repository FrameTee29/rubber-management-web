import { FC } from "react";
import { Navbar } from "../Navbar";

interface IProps {
  pageProps: {};
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
