import { FC } from "react";
import ReactTooltip from "react-tooltip";
import { LogoutIcon, UserAddIcon } from "@heroicons/react/solid";
import { MenuSidebar } from "../MenuSidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { KeyLocalStorage } from "@constants/keyLocalStorage";

const Sidebar: FC = () => {
  const router = useRouter();

  const activeMenu = (path: string) => {
    if (router.pathname === path) {
      return "bg-cream-secondary text-dark-green-primary border-cream-primary border-2";
    }

    return "text-cream-primary";
  };

  const handleLogout = () => {
    localStorage.removeItem(KeyLocalStorage.accessToken);
    router.push("/auth/signin");
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen w-20 bg-dark-green-primary py-2">
      <ReactTooltip effect="solid" />
      <div>
        <Image src="/images/logo_transparent.png" width={100} height={100} />
      </div>

      <div className="flex-0 space-y-4">
        {MenuSidebar.map((menu, index) => {
          return (
            <div key={index}>
              <Link href={menu.href}>
                <p
                  data-tip={menu.title}
                  className={`h-10 w-10 cursor-pointer   rounded  text-center p-1 ${activeMenu(
                    menu.href
                  )}`}
                >
                  {menu.icon}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="cursor-auto" onClick={() => handleLogout()}>
        <p data-tip="Logout">
          <LogoutIcon className="h-10 w-10 text-cream-primary hover:text-cream-secondary text-center" />
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
